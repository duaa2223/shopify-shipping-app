// // ===== server.js =====
// const express = require('express');
// const app = express();

// // Middleware لقراءة JSON
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true }));

// // إعدادات الشحن لكل دولة (بالدرهم الإماراتي AED)
// // ملاحظة: يمكنك تغيير العملة حسب متجرك
// const shippingRates = {
//   // دول الخليج
//   'AE': { name: 'الإمارات', price: 10.00, currency: 'AED', deliveryDays: '2-4' },
//   'SA': { name: 'السعودية', price: 15.00, currency: 'AED', deliveryDays: '3-5' },
//   'KW': { name: 'الكويت', price: 12.00, currency: 'AED', deliveryDays: '3-5' },
//   'QA': { name: 'قطر', price: 12.00, currency: 'AED', deliveryDays: '3-5' },
//   'BH': { name: 'البحرين', price: 12.00, currency: 'AED', deliveryDays: '3-5' },
//   'OM': { name: 'عمان', price: 12.00, currency: 'AED', deliveryDays: '3-5' },
  
//   // دول عربية أخرى
//   'JO': { name: 'الأردن', price: 12.00, currency: 'AED', deliveryDays: '4-7' },
//   'EG': { name: 'مصر', price: 20.00, currency: 'AED', deliveryDays: '5-8' },
//   'LB': { name: 'لبنان', price: 18.00, currency: 'AED', deliveryDays: '5-8' },
//   'IQ': { name: 'العراق', price: 22.00, currency: 'AED', deliveryDays: '5-10' },
//   'PS': { name: 'فلسطين', price: 18.00, currency: 'AED', deliveryDays: '5-8' },
//   'SY': { name: 'سوريا', price: 25.00, currency: 'AED', deliveryDays: '7-12' },
//   'YE': { name: 'اليمن', price: 25.00, currency: 'AED', deliveryDays: '7-14' },
//   'LY': { name: 'ليبيا', price: 25.00, currency: 'AED', deliveryDays: '7-12' },
//   'TN': { name: 'تونس', price: 28.00, currency: 'AED', deliveryDays: '7-12' },
//   'DZ': { name: 'الجزائر', price: 28.00, currency: 'AED', deliveryDays: '7-12' },
//   'MA': { name: 'المغرب', price: 30.00, currency: 'AED', deliveryDays: '7-12' },
//   'SD': { name: 'السودان', price: 30.00, currency: 'AED', deliveryDays: '7-14' },
  
//   // دول أوروبية وأمريكية
//   'US': { name: 'الولايات المتحدة', price: 35.00, currency: 'AED', deliveryDays: '7-14' },
//   'GB': { name: 'بريطانيا', price: 30.00, currency: 'AED', deliveryDays: '5-10' },
//   'DE': { name: 'ألمانيا', price: 30.00, currency: 'AED', deliveryDays: '5-10' },
//   'FR': { name: 'فرنسا', price: 30.00, currency: 'AED', deliveryDays: '5-10' },
//   'IT': { name: 'إيطاليا', price: 30.00, currency: 'AED', deliveryDays: '5-10' },
//   'ES': { name: 'إسبانيا', price: 30.00, currency: 'AED', deliveryDays: '5-10' },
//   'CA': { name: 'كندا', price: 35.00, currency: 'AED', deliveryDays: '7-14' },
// };

// // السعر الافتراضي للدول غير المدرجة
// const defaultRate = { 
//   name: 'شحن دولي', 
//   price: 40.00, 
//   currency: 'AED', 
//   deliveryDays: '7-21' 
// };

// // الصفحة الرئيسية للتحقق من عمل السيرفر
// app.get('/', (req, res) => {
//   res.json({
//     status: '✅ التطبيق يعمل بنجاح',
//     message: 'تطبيق حساب الشحن المخصص لـ Shopify',
//     version: '1.0.0',
//     endpoints: {
//       main: 'POST /shipping-rates',
//       test: 'GET /test-rates/:countryCode',
//       allRates: 'GET /all-rates',
//       health: 'GET /health'
//     },
//     supportedCountries: Object.keys(shippingRates).length,
//     timestamp: new Date().toISOString()
//   });
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
// });

// // Endpoint الرئيسي الذي سيستخدمه Shopify Carrier Service
// app.post('/shipping-rates', (req, res) => {
//   try {
//     console.log('\n🔔 ===== طلب جديد من Shopify =====');
//     console.log('📅 الوقت:', new Date().toLocaleString('ar-AE'));
//     console.log('📦 البيانات المستلمة:', JSON.stringify(req.body, null, 2));

//     // التحقق من صحة البيانات
//     const { rate } = req.body;
    
//     if (!rate) {
//       console.log('❌ خطأ: بيانات rate مفقودة');
//       return res.status(400).json({
//         rates: [],
//         error: 'بيانات الطلب غير صحيحة'
//       });
//     }

//     if (!rate.destination) {
//       console.log('❌ خطأ: بيانات destination مفقودة');
//       return res.status(400).json({
//         rates: [],
//         error: 'بيانات العنوان مفقودة'
//       });
//     }

//     // استخراج معلومات الوجهة
//     const destination = rate.destination;
//     const countryCode = destination.country;
//     const province = destination.province || '';
//     const city = destination.city || '';
//     const postalCode = destination.postal_code || '';
    
//     console.log(`\n📍 معلومات الوجهة:`);
//     console.log(`   🌍 الدولة: ${countryCode}`);
//     console.log(`   🏙️  المدينة: ${city}`);
//     console.log(`   📮 المحافظة: ${province}`);
//     console.log(`   🔢 الرمز البريدي: ${postalCode}`);

//     // استخراج معلومات المنتجات (اختياري - للاستخدام المستقبلي)
//     const items = rate.items || [];
//     const totalWeight = items.reduce((sum, item) => sum + (item.grams * item.quantity), 0);
//     const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    
//     console.log(`\n📊 معلومات الطلب:`);
//     console.log(`   📦 عدد المنتجات: ${items.length}`);
//     console.log(`   ⚖️  الوزن الكلي: ${totalWeight}g`);
//     console.log(`   💰 القيمة الكلية: ${totalPrice}`);

//     // الحصول على سعر الشحن حسب الدولة
//     let shippingRate = shippingRates[countryCode];
    
//     if (!shippingRate) {
//       console.log(`⚠️  الدولة ${countryCode} غير موجودة في القائمة، استخدام السعر الافتراضي`);
//       shippingRate = defaultRate;
//     }

//     console.log(`\n💵 سعر الشحن المحدد:`);
//     console.log(`   📝 الاسم: ${shippingRate.name}`);
//     console.log(`   💰 السعر: ${shippingRate.price} ${shippingRate.currency}`);
//     console.log(`   🚚 مدة التوصيل: ${shippingRate.deliveryDays} أيام`);

//     // تحويل السعر إلى سنت (Shopify يستخدم أصغر وحدة من العملة)
//     // مثال: 10.00 AED = 1000 فلس
//     const priceInCents = Math.round(shippingRate.price * 100);

//     // إنشاء اسم الخدمة والوصف
//     const serviceName = `Standard (Example)`;  // متوافق مع الواجهة
//     const description = `توصيل خلال ${shippingRate.deliveryDays} أيام عمل إلى ${shippingRate.name}`;

//     // الاستجابة بصيغة Shopify المطلوبة
//     const response = {
//       rates: [
//         {
//           service_name: serviceName,
//           service_code: `CUSTOM_SHIPPING_${countryCode}`,
//           total_price: priceInCents.toString(),
//           currency: shippingRate.currency,
//           description: description,
//           min_delivery_date: null,  // يمكن إضافة تاريخ محدد
//           max_delivery_date: null   // يمكن إضافة تاريخ محدد
//         }
//       ]
//     };

//     console.log(`\n✅ الاستجابة المرسلة:`);
//     console.log(JSON.stringify(response, null, 2));
//     console.log('====================================\n');

//     res.json(response);

//   } catch (error) {
//     console.error('\n❌ حدث خطأ في معالجة الطلب:', error);
//     console.error('Stack:', error.stack);
    
//     res.status(500).json({
//       rates: [],
//       error: 'حدث خطأ في حساب تكلفة الشحن',
//       details: error.message
//     });
//   }
// });

// // Endpoint لاختبار سعر دولة معينة
// app.get('/test-rates/:countryCode', (req, res) => {
//   const { countryCode } = req.params;
//   const upperCode = countryCode.toUpperCase();
//   const rate = shippingRates[upperCode] || defaultRate;
  
//   res.json({
//     country: upperCode,
//     countryName: rate.name,
//     shipping: {
//       price: rate.price,
//       currency: rate.currency,
//       priceInCents: Math.round(rate.price * 100),
//       deliveryDays: rate.deliveryDays
//     },
//     formattedPrice: `${rate.currency} ${rate.price.toFixed(2)}`,
//     message: shippingRates[upperCode] 
//       ? `سعر شحن محدد لـ ${rate.name}` 
//       : `سعر شحن افتراضي (الدولة غير مدرجة)`
//   });
// });

// // عرض جميع الأسعار المتاحة
// app.get('/all-rates', (req, res) => {
//   const formattedRates = {};
  
//   Object.keys(shippingRates).forEach(code => {
//     formattedRates[code] = {
//       ...shippingRates[code],
//       priceInCents: Math.round(shippingRates[code].price * 100),
//       formatted: `${shippingRates[code].currency} ${shippingRates[code].price.toFixed(2)}`
//     };
//   });

//   res.json({
//     totalCountries: Object.keys(shippingRates).length,
//     rates: formattedRates,
//     defaultRate: {
//       ...defaultRate,
//       priceInCents: Math.round(defaultRate.price * 100),
//       formatted: `${defaultRate.currency} ${defaultRate.price.toFixed(2)}`
//     }
//   });
// });

// // معالجة الأخطاء 404
// app.use((req, res) => {
//   res.status(404).json({
//     error: 'الصفحة غير موجودة',
//     path: req.path,
//     method: req.method
//   });
// });

// // معالجة الأخطاء العامة
// app.use((err, req, res, next) => {
//   console.error('خطأ في التطبيق:', err);
//   res.status(500).json({
//     error: 'حدث خطأ في الخادم',
//     message: err.message
//   });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log('\n🚀 ====================================');
//   console.log(`✅ السيرفر يعمل بنجاح على المنفذ ${PORT}`);
//   console.log('====================================');
//   console.log(`\n📍 عناوين الاختبار المحلية:`);
//   console.log(`   - الصفحة الرئيسية: http://localhost:${PORT}/`);
//   console.log(`   - اختبار الشحن: http://localhost:${PORT}/test-rates/AE`);
//   console.log(`   - جميع الأسعار: http://localhost:${PORT}/all-rates`);
//   console.log(`   - Health Check: http://localhost:${PORT}/health`);
//   console.log(`\n📦 Shopify Endpoint:`);
//   console.log(`   POST http://localhost:${PORT}/shipping-rates`);
//   console.log('\n💡 نصيحة: استخدم Postman لاختبار الـ API قبل الربط مع Shopify');
//   console.log('====================================\n');
// });

// module.exports = app;

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS للسماح لـ Shopify بالاتصال
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// أسعار الشحن حسب الدولة (بالدرهم الإماراتي)
const shippingRates = {
  'AE': { price: 10, name: 'United Arab Emirates' },
  'SA': { price: 15, name: 'Saudi Arabia' },
  'KW': { price: 11, name: 'Kuwait' },
  'JO': { price: 12, name: 'Jordan' },
  'PS': { price: 12, name: 'Palestine' },
  'QA': { price: 11, name: 'Qatar' },
  'BH': { price: 10, name: 'Bahrain' },
  'OM': { price: 13, name: 'Oman' },
  'EG': { price: 14, name: 'Egypt' },
  'LB': { price: 13, name: 'Lebanon' },
  'IQ': { price: 15, name: 'Iraq' },
  'YE': { price: 16, name: 'Yemen' },
  'SY': { price: 14, name: 'Syria' },
  'PS': { price: 13, name: 'Palestine' },
  'LY': { price: 15, name: 'Libya' },
  'SD': { price: 16, name: 'Sudan' },
  'TN': { price: 15, name: 'Tunisia' },
  'DZ': { price: 16, name: 'Algeria' },
  'MA': { price: 16, name: 'Morocco' },
  'MR': { price: 17, name: 'Mauritania' },
  'SO': { price: 18, name: 'Somalia' },
  'DJ': { price: 17, name: 'Djibouti' },
  'KM': { price: 18, name: 'Comoros' },
  'TR': { price: 14, name: 'Turkey' },
  'IR': { price: 15, name: 'Iran' },
  'PK': { price: 14, name: 'Pakistan' }
};

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.json({
    status: '✅ التطبيق يعمل بنجاح',
    message: 'تطبيق حساب الشحن المخصص لـ Shopify',
    version: '1.0.2',
    endpoints: {
      main: 'POST /shipping-rates',
      test: 'GET /test-rates/:countryCode',
      allRates: 'GET /all-rates',
      health: 'GET /health'
    },
    supportedCountries: Object.keys(shippingRates).length,
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Endpoint الرئيسي لـ Shopify - يجب أن يكون بصيغة محددة جداً
app.post('/shipping-rates', (req, res) => {
  try {
    console.log('📦 ===== Shopify Request Received =====');
    console.log('Full Request Body:', JSON.stringify(req.body, null, 2));

    const { rate } = req.body;

    // التحقق من البيانات المطلوبة
    if (!rate || !rate.destination || !rate.destination.country) {
      console.error('❌ Invalid request structure');
      return res.status(400).json({
        rates: []
      });
    }

    const countryCode = rate.destination.country.toUpperCase();
    const currency = rate.currency || 'AED';

    console.log(`🌍 Destination Country: ${countryCode}`);
    console.log(`💰 Currency: ${currency}`);

    const shippingInfo = shippingRates[countryCode];

    if (!shippingInfo) {
      console.log(`⚠️ Country not supported: ${countryCode}`);
      console.log('✅ Returning empty rates array');
      return res.status(200).json({
        rates: []
      });
    }

    // حساب السعر بالفلس (cents)
    const priceInCents = Math.round(shippingInfo.price * 100);

    // بناء الاستجابة بالصيغة الصحيحة تماماً
    const response = {
      rates: [
        {
          service_name: `Shipping to ${shippingInfo.name}`,
          service_code: `SHIP_${countryCode}`,
          total_price: priceInCents.toString(),
          currency: currency
        }
      ]
    };

    console.log('✅ Response sent:', JSON.stringify(response, null, 2));
    console.log('========================================');

    // إرجاع الاستجابة بـ Content-Type صحيح
    return res.status(200)
      .set('Content-Type', 'application/json')
      .json(response);

  } catch (error) {
    console.error('❌ Error in /shipping-rates:', error);
    console.error('Error stack:', error.stack);
    return res.status(200).json({
      rates: []
    });
  }
});

// Endpoint للاختبار
app.get('/test-rates/:countryCode', (req, res) => {
  const countryCode = req.params.countryCode.toUpperCase();
  const shippingInfo = shippingRates[countryCode];

  if (!shippingInfo) {
    return res.status(404).json({
      error: 'Country not found',
      availableCountries: Object.keys(shippingRates)
    });
  }

  res.json({
    country: countryCode,
    countryName: shippingInfo.name,
    shippingRate: `${shippingInfo.price}.00 AED`,
    priceInCents: shippingInfo.price * 100
  });
});

// عرض جميع الأسعار
app.get('/all-rates', (req, res) => {
  const allRates = Object.entries(shippingRates).map(([code, info]) => ({
    countryCode: code,
    countryName: info.name,
    rate: `${info.price}.00 AED`
  }));

  res.json({
    totalCountries: allRates.length,
    rates: allRates
  });
});

// معالجة الأخطاء العامة
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    rates: []
  });
});

// بدء الخادم
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Endpoints:`);
  console.log(`   - GET  /`);
  console.log(`   - POST /shipping-rates (Shopify webhook)`);
  console.log(`   - GET  /test-rates/:countryCode`);
  console.log(`   - GET  /all-rates`);
  console.log(`   - GET  /health`);
  console.log(`✅ Ready to receive requests from Shopify!`);
});