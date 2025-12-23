// // // ===== server.js =====
// // const express = require('express');
// // const app = express();

// // // Middleware لقراءة JSON
// // app.use(express.json({ limit: '50mb' }));
// // app.use(express.urlencoded({ extended: true }));

// // // إعدادات الشحن لكل دولة (بالدرهم الإماراتي AED)
// // // ملاحظة: يمكنك تغيير العملة حسب متجرك
// // const shippingRates = {
// //   // دول الخليج
// //   'AE': { name: 'الإمارات', price: 10.00, currency: 'AED', deliveryDays: '2-4' },
// //   'SA': { name: 'السعودية', price: 15.00, currency: 'AED', deliveryDays: '3-5' },
// //   'KW': { name: 'الكويت', price: 12.00, currency: 'AED', deliveryDays: '3-5' },
// //   'QA': { name: 'قطر', price: 12.00, currency: 'AED', deliveryDays: '3-5' },
// //   'BH': { name: 'البحرين', price: 12.00, currency: 'AED', deliveryDays: '3-5' },
// //   'OM': { name: 'عمان', price: 12.00, currency: 'AED', deliveryDays: '3-5' },
  
// //   // دول عربية أخرى
// //   'JO': { name: 'الأردن', price: 12.00, currency: 'AED', deliveryDays: '4-7' },
// //   'EG': { name: 'مصر', price: 20.00, currency: 'AED', deliveryDays: '5-8' },
// //   'LB': { name: 'لبنان', price: 18.00, currency: 'AED', deliveryDays: '5-8' },
// //   'IQ': { name: 'العراق', price: 22.00, currency: 'AED', deliveryDays: '5-10' },
// //   'PS': { name: 'فلسطين', price: 18.00, currency: 'AED', deliveryDays: '5-8' },
// //   'SY': { name: 'سوريا', price: 25.00, currency: 'AED', deliveryDays: '7-12' },
// //   'YE': { name: 'اليمن', price: 25.00, currency: 'AED', deliveryDays: '7-14' },
// //   'LY': { name: 'ليبيا', price: 25.00, currency: 'AED', deliveryDays: '7-12' },
// //   'TN': { name: 'تونس', price: 28.00, currency: 'AED', deliveryDays: '7-12' },
// //   'DZ': { name: 'الجزائر', price: 28.00, currency: 'AED', deliveryDays: '7-12' },
// //   'MA': { name: 'المغرب', price: 30.00, currency: 'AED', deliveryDays: '7-12' },
// //   'SD': { name: 'السودان', price: 30.00, currency: 'AED', deliveryDays: '7-14' },
  
// //   // دول أوروبية وأمريكية
// //   'US': { name: 'الولايات المتحدة', price: 35.00, currency: 'AED', deliveryDays: '7-14' },
// //   'GB': { name: 'بريطانيا', price: 30.00, currency: 'AED', deliveryDays: '5-10' },
// //   'DE': { name: 'ألمانيا', price: 30.00, currency: 'AED', deliveryDays: '5-10' },
// //   'FR': { name: 'فرنسا', price: 30.00, currency: 'AED', deliveryDays: '5-10' },
// //   'IT': { name: 'إيطاليا', price: 30.00, currency: 'AED', deliveryDays: '5-10' },
// //   'ES': { name: 'إسبانيا', price: 30.00, currency: 'AED', deliveryDays: '5-10' },
// //   'CA': { name: 'كندا', price: 35.00, currency: 'AED', deliveryDays: '7-14' },
// // };

// // // السعر الافتراضي للدول غير المدرجة
// // const defaultRate = { 
// //   name: 'شحن دولي', 
// //   price: 40.00, 
// //   currency: 'AED', 
// //   deliveryDays: '7-21' 
// // };

// // // الصفحة الرئيسية للتحقق من عمل السيرفر
// // app.get('/', (req, res) => {
// //   res.json({
// //     status: '✅ التطبيق يعمل بنجاح',
// //     message: 'تطبيق حساب الشحن المخصص لـ Shopify',
// //     version: '1.0.0',
// //     endpoints: {
// //       main: 'POST /shipping-rates',
// //       test: 'GET /test-rates/:countryCode',
// //       allRates: 'GET /all-rates',
// //       health: 'GET /health'
// //     },
// //     supportedCountries: Object.keys(shippingRates).length,
// //     timestamp: new Date().toISOString()
// //   });
// // });

// // // Health check endpoint
// // app.get('/health', (req, res) => {
// //   res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
// // });

// // // Endpoint الرئيسي الذي سيستخدمه Shopify Carrier Service
// // app.post('/shipping-rates', (req, res) => {
// //   try {
// //     console.log('\n🔔 ===== طلب جديد من Shopify =====');
// //     console.log('📅 الوقت:', new Date().toLocaleString('ar-AE'));
// //     console.log('📦 البيانات المستلمة:', JSON.stringify(req.body, null, 2));

// //     // التحقق من صحة البيانات
// //     const { rate } = req.body;
    
// //     if (!rate) {
// //       console.log('❌ خطأ: بيانات rate مفقودة');
// //       return res.status(400).json({
// //         rates: [],
// //         error: 'بيانات الطلب غير صحيحة'
// //       });
// //     }

// //     if (!rate.destination) {
// //       console.log('❌ خطأ: بيانات destination مفقودة');
// //       return res.status(400).json({
// //         rates: [],
// //         error: 'بيانات العنوان مفقودة'
// //       });
// //     }

// //     // استخراج معلومات الوجهة
// //     const destination = rate.destination;
// //     const countryCode = destination.country;
// //     const province = destination.province || '';
// //     const city = destination.city || '';
// //     const postalCode = destination.postal_code || '';
    
// //     console.log(`\n📍 معلومات الوجهة:`);
// //     console.log(`   🌍 الدولة: ${countryCode}`);
// //     console.log(`   🏙️  المدينة: ${city}`);
// //     console.log(`   📮 المحافظة: ${province}`);
// //     console.log(`   🔢 الرمز البريدي: ${postalCode}`);

// //     // استخراج معلومات المنتجات (اختياري - للاستخدام المستقبلي)
// //     const items = rate.items || [];
// //     const totalWeight = items.reduce((sum, item) => sum + (item.grams * item.quantity), 0);
// //     const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    
// //     console.log(`\n📊 معلومات الطلب:`);
// //     console.log(`   📦 عدد المنتجات: ${items.length}`);
// //     console.log(`   ⚖️  الوزن الكلي: ${totalWeight}g`);
// //     console.log(`   💰 القيمة الكلية: ${totalPrice}`);

// //     // الحصول على سعر الشحن حسب الدولة
// //     let shippingRate = shippingRates[countryCode];
    
// //     if (!shippingRate) {
// //       console.log(`⚠️  الدولة ${countryCode} غير موجودة في القائمة، استخدام السعر الافتراضي`);
// //       shippingRate = defaultRate;
// //     }

// //     console.log(`\n💵 سعر الشحن المحدد:`);
// //     console.log(`   📝 الاسم: ${shippingRate.name}`);
// //     console.log(`   💰 السعر: ${shippingRate.price} ${shippingRate.currency}`);
// //     console.log(`   🚚 مدة التوصيل: ${shippingRate.deliveryDays} أيام`);

// //     // تحويل السعر إلى سنت (Shopify يستخدم أصغر وحدة من العملة)
// //     // مثال: 10.00 AED = 1000 فلس
// //     const priceInCents = Math.round(shippingRate.price * 100);

// //     // إنشاء اسم الخدمة والوصف
// //     const serviceName = `Standard (Example)`;  // متوافق مع الواجهة
// //     const description = `توصيل خلال ${shippingRate.deliveryDays} أيام عمل إلى ${shippingRate.name}`;

// //     // الاستجابة بصيغة Shopify المطلوبة
// //     const response = {
// //       rates: [
// //         {
// //           service_name: serviceName,
// //           service_code: `CUSTOM_SHIPPING_${countryCode}`,
// //           total_price: priceInCents.toString(),
// //           currency: shippingRate.currency,
// //           description: description,
// //           min_delivery_date: null,  // يمكن إضافة تاريخ محدد
// //           max_delivery_date: null   // يمكن إضافة تاريخ محدد
// //         }
// //       ]
// //     };

// //     console.log(`\n✅ الاستجابة المرسلة:`);
// //     console.log(JSON.stringify(response, null, 2));
// //     console.log('====================================\n');

// //     res.json(response);

// //   } catch (error) {
// //     console.error('\n❌ حدث خطأ في معالجة الطلب:', error);
// //     console.error('Stack:', error.stack);
    
// //     res.status(500).json({
// //       rates: [],
// //       error: 'حدث خطأ في حساب تكلفة الشحن',
// //       details: error.message
// //     });
// //   }
// // });

// // // Endpoint لاختبار سعر دولة معينة
// // app.get('/test-rates/:countryCode', (req, res) => {
// //   const { countryCode } = req.params;
// //   const upperCode = countryCode.toUpperCase();
// //   const rate = shippingRates[upperCode] || defaultRate;
  
// //   res.json({
// //     country: upperCode,
// //     countryName: rate.name,
// //     shipping: {
// //       price: rate.price,
// //       currency: rate.currency,
// //       priceInCents: Math.round(rate.price * 100),
// //       deliveryDays: rate.deliveryDays
// //     },
// //     formattedPrice: `${rate.currency} ${rate.price.toFixed(2)}`,
// //     message: shippingRates[upperCode] 
// //       ? `سعر شحن محدد لـ ${rate.name}` 
// //       : `سعر شحن افتراضي (الدولة غير مدرجة)`
// //   });
// // });

// // // عرض جميع الأسعار المتاحة
// // app.get('/all-rates', (req, res) => {
// //   const formattedRates = {};
  
// //   Object.keys(shippingRates).forEach(code => {
// //     formattedRates[code] = {
// //       ...shippingRates[code],
// //       priceInCents: Math.round(shippingRates[code].price * 100),
// //       formatted: `${shippingRates[code].currency} ${shippingRates[code].price.toFixed(2)}`
// //     };
// //   });

// //   res.json({
// //     totalCountries: Object.keys(shippingRates).length,
// //     rates: formattedRates,
// //     defaultRate: {
// //       ...defaultRate,
// //       priceInCents: Math.round(defaultRate.price * 100),
// //       formatted: `${defaultRate.currency} ${defaultRate.price.toFixed(2)}`
// //     }
// //   });
// // });

// // // معالجة الأخطاء 404
// // app.use((req, res) => {
// //   res.status(404).json({
// //     error: 'الصفحة غير موجودة',
// //     path: req.path,
// //     method: req.method
// //   });
// // });

// // // معالجة الأخطاء العامة
// // app.use((err, req, res, next) => {
// //   console.error('خطأ في التطبيق:', err);
// //   res.status(500).json({
// //     error: 'حدث خطأ في الخادم',
// //     message: err.message
// //   });
// // });

// // const PORT = process.env.PORT || 3000;

// // app.listen(PORT, () => {
// //   console.log('\n🚀 ====================================');
// //   console.log(`✅ السيرفر يعمل بنجاح على المنفذ ${PORT}`);
// //   console.log('====================================');
// //   console.log(`\n📍 عناوين الاختبار المحلية:`);
// //   console.log(`   - الصفحة الرئيسية: http://localhost:${PORT}/`);
// //   console.log(`   - اختبار الشحن: http://localhost:${PORT}/test-rates/AE`);
// //   console.log(`   - جميع الأسعار: http://localhost:${PORT}/all-rates`);
// //   console.log(`   - Health Check: http://localhost:${PORT}/health`);
// //   console.log(`\n📦 Shopify Endpoint:`);
// //   console.log(`   POST http://localhost:${PORT}/shipping-rates`);
// //   console.log('\n💡 نصيحة: استخدم Postman لاختبار الـ API قبل الربط مع Shopify');
// //   console.log('====================================\n');
// // });

// // module.exports = app;

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// // CORS للسماح لـ Shopify بالاتصال
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

// // أسعار الشحن حسب الدولة (بالدرهم الإماراتي)
// const shippingRates = {
//   'AE': { price: 10, name: 'United Arab Emirates' },
//   'SA': { price: 15, name: 'Saudi Arabia' },
//   'KW': { price: 11, name: 'Kuwait' },
//   'JO': { price: 15, name: 'Jordan' },
//   'PS': { price: 12, name: 'Palestine' },
//   'QA': { price: 11, name: 'Qatar' },
//   'BH': { price: 10, name: 'Bahrain' },
//   'OM': { price: 13, name: 'Oman' },
//   'EG': { price: 14, name: 'Egypt' },
//   'LB': { price: 13, name: 'Lebanon' },
//   'IQ': { price: 15, name: 'Iraq' },
//   'YE': { price: 16, name: 'Yemen' },
//   'SY': { price: 14, name: 'Syria' },
//   'PS': { price: 13, name: 'Palestine' },
//   'LY': { price: 15, name: 'Libya' },
//   'SD': { price: 16, name: 'Sudan' },
//   'TN': { price: 15, name: 'Tunisia' },
//   'DZ': { price: 16, name: 'Algeria' },
//   'MA': { price: 16, name: 'Morocco' },
//   'MR': { price: 17, name: 'Mauritania' },
//   'SO': { price: 18, name: 'Somalia' },
//   'DJ': { price: 17, name: 'Djibouti' },
//   'KM': { price: 18, name: 'Comoros' },
//   'TR': { price: 14, name: 'Turkey' },
//   'IR': { price: 15, name: 'Iran' },
//   'PK': { price: 14, name: 'Pakistan' }
// };

// // الصفحة الرئيسية
// app.get('/', (req, res) => {
//   res.json({
//     status: '✅ التطبيق يعمل بنجاح',
//     message: 'تطبيق حساب الشحن المخصص لـ Shopify',
//     version: '1.0.2',
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

// // Health check
// app.get('/health', (req, res) => {
//   res.json({
//     status: 'healthy',
//     uptime: process.uptime(),
//     timestamp: new Date().toISOString()
//   });
// });

// // Endpoint الرئيسي لـ Shopify - يجب أن يكون بصيغة محددة جداً
// app.post('/shipping-rates', (req, res) => {
//   try {
//     console.log('📦 ===== Shopify Request Received =====');
//     console.log('Full Request Body:', JSON.stringify(req.body, null, 2));

//     const { rate } = req.body;

//     // التحقق من البيانات المطلوبة
//     if (!rate || !rate.destination || !rate.destination.country) {
//       console.error('❌ Invalid request structure');
//       return res.status(400).json({
//         rates: []
//       });
//     }

//     const countryCode = rate.destination.country.toUpperCase();
//     const currency = rate.currency || 'AED';

//     console.log(`🌍 Destination Country: ${countryCode}`);
//     console.log(`💰 Currency: ${currency}`);

//     const shippingInfo = shippingRates[countryCode];

//     if (!shippingInfo) {
//       console.log(`⚠️ Country not supported: ${countryCode}`);
//       console.log('✅ Returning empty rates array');
//       return res.status(200).json({
//         rates: []
//       });
//     }

//     // حساب السعر بالفلس (cents)
//     const priceInCents = Math.round(shippingInfo.price * 100);

//     // بناء الاستجابة بالصيغة الصحيحة تماماً
//     const response = {
//       rates: [
//         {
//           service_name: `Shipping to ${shippingInfo.name}`,
//           service_code: `SHIP_${countryCode}`,
//           total_price: priceInCents.toString(),
//           currency: currency
//         }
//       ]
//     };

//     console.log('✅ Response sent:', JSON.stringify(response, null, 2));
//     console.log('========================================');

//     // إرجاع الاستجابة بـ Content-Type صحيح
//     return res.status(200)
//       .set('Content-Type', 'application/json')
//       .json(response);

//   } catch (error) {
//     console.error('❌ Error in /shipping-rates:', error);
//     console.error('Error stack:', error.stack);
//     return res.status(200).json({
//       rates: []
//     });
//   }
// });

// // Endpoint للاختبار
// app.get('/test-rates/:countryCode', (req, res) => {
//   const countryCode = req.params.countryCode.toUpperCase();
//   const shippingInfo = shippingRates[countryCode];

//   if (!shippingInfo) {
//     return res.status(404).json({
//       error: 'Country not found',
//       availableCountries: Object.keys(shippingRates)
//     });
//   }

//   res.json({
//     country: countryCode,
//     countryName: shippingInfo.name,
//     shippingRate: `${shippingInfo.price}.00 AED`,
//     priceInCents: shippingInfo.price * 100
//   });
// });

// // عرض جميع الأسعار
// app.get('/all-rates', (req, res) => {
//   const allRates = Object.entries(shippingRates).map(([code, info]) => ({
//     countryCode: code,
//     countryName: info.name,
//     rate: `${info.price}.00 AED`
//   }));

//   res.json({
//     totalCountries: allRates.length,
//     rates: allRates
//   });
// });

// // معالجة الأخطاء العامة
// app.use((err, req, res, next) => {
//   console.error('❌ Unhandled error:', err);
//   res.status(500).json({
//     rates: []
//   });
// });

// // بدء الخادم
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
//   console.log(`📍 Endpoints:`);
//   console.log(`   - GET  /`);
//   console.log(`   - POST /shipping-rates (Shopify webhook)`);
//   console.log(`   - GET  /test-rates/:countryCode`);
//   console.log(`   - GET  /all-rates`);
//   console.log(`   - GET  /health`);
//   console.log(`✅ Ready to receive requests from Shopify!`);
// });
////////////////////////////////////////////////////////////////////////


// const express = require('express');
// const app = express();

// // ✅ استخدام PORT من البيئة (مهم جداً لـ Render)
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true }));

// // CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

// // أسعار الشحن
// const shippingRates = {
//   'AE': { price: 10, name: 'United Arab Emirates', days: '2-4' },
//   'SA': { price: 15, name: 'Saudi Arabia', days: '3-5' },
//   'KW': { price: 11, name: 'Kuwait', days: '3-5' },
//   'JO': { price: 15, name: 'Jordan', days: '4-7' },
//   'PS': { price: 12, name: 'Palestine', days: '5-8' },
//   'QA': { price: 11, name: 'Qatar', days: '3-5' },
//   'BH': { price: 10, name: 'Bahrain', days: '3-5' },
//   'OM': { price: 13, name: 'Oman', days: '3-5' },
//   'EG': { price: 14, name: 'Egypt', days: '5-8' },
//   'LB': { price: 13, name: 'Lebanon', days: '5-8' },
//   'IQ': { price: 15, name: 'Iraq', days: '5-10' },
//   'YE': { price: 16, name: 'Yemen', days: '7-14' },
//   'SY': { price: 14, name: 'Syria', days: '7-12' },
//   'LY': { price: 15, name: 'Libya', days: '7-12' },
//   'SD': { price: 16, name: 'Sudan', days: '7-14' },
//   'TN': { price: 15, name: 'Tunisia', days: '7-12' },
//   'DZ': { price: 16, name: 'Algeria', days: '7-12' },
//   'MA': { price: 16, name: 'Morocco', days: '7-12' },
//   'MR': { price: 17, name: 'Mauritania', days: '7-14' },
//   'SO': { price: 18, name: 'Somalia', days: '7-14' },
//   'DJ': { price: 17, name: 'Djibouti', days: '7-14' },
//   'KM': { price: 18, name: 'Comoros', days: '7-14' },
//   'TR': { price: 14, name: 'Turkey', days: '5-10' },
//   'IR': { price: 15, name: 'Iran', days: '5-10' },
//   'PK': { price: 14, name: 'Pakistan', days: '5-10' }
// };

// // ✅ الصفحة الرئيسية - مهمة جداً لـ Render
// app.get('/', (req, res) => {
//   res.status(200).json({
//     status: '✅ النظام يعمل بنجاح',
//     service: 'Shopify Shipping Calculator',
//     version: '1.0.3',
//     environment: process.env.NODE_ENV || 'development',
//     port: PORT,
//     endpoints: {
//       health: 'GET /health',
//       shipping: 'POST /shipping-rates',
//       test: 'GET /test-rates/:countryCode',
//       allRates: 'GET /all-rates'
//     },
//     supportedCountries: Object.keys(shippingRates).length,
//     timestamp: new Date().toISOString(),
//     uptime: Math.floor(process.uptime()) + ' seconds'
//   });
// });

// // ✅ Health Check - مهم جداً لـ Render
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     status: 'healthy',
//     service: 'running',
//     uptime: process.uptime(),
//     memory: process.memoryUsage(),
//     timestamp: new Date().toISOString()
//   });
// });

// // ✅ Ping endpoint - للتحقق السريع
// app.get('/ping', (req, res) => {
//   res.status(200).send('pong');
// });

// // ✅ Endpoint الرئيسي لـ Shopify
// app.post('/shipping-rates', (req, res) => {
//   try {
//     console.log('\n📦 ===== Shopify Request =====');
//     console.log('Time:', new Date().toISOString());
//     console.log('Body:', JSON.stringify(req.body, null, 2));

//     const { rate } = req.body;

//     if (!rate || !rate.destination || !rate.destination.country) {
//       console.error('❌ Invalid request structure');
//       return res.status(200).json({ rates: [] });
//     }

//     const countryCode = rate.destination.country.toUpperCase();
//     const currency = rate.currency || 'AED';

//     console.log(`🌍 Country: ${countryCode}`);
//     console.log(`💰 Currency: ${currency}`);

//     const shippingInfo = shippingRates[countryCode];

//     if (!shippingInfo) {
//       console.log(`⚠️ Country not supported: ${countryCode}`);
//       return res.status(200).json({ rates: [] });
//     }

//     const priceInCents = Math.round(shippingInfo.price * 100);

//     const response = {
//       rates: [
//         {
//           service_name: `Shipping to ${shippingInfo.name}`,
//           service_code: `SHIP_${countryCode}`,
//           total_price: priceInCents.toString(),
//           currency: currency,
//           description: `Delivery in ${shippingInfo.days} business days`
//         }
//       ]
//     };

//     console.log('✅ Response:', JSON.stringify(response, null, 2));
//     console.log('==============================\n');

//     return res.status(200)
//       .set('Content-Type', 'application/json')
//       .json(response);

//   } catch (error) {
//     console.error('❌ Error:', error);
//     console.error('Stack:', error.stack);
//     return res.status(200).json({ rates: [] });
//   }
// });

// // ✅ اختبار دولة محددة
// app.get('/test-rates/:countryCode', (req, res) => {
//   const countryCode = req.params.countryCode.toUpperCase();
//   const shippingInfo = shippingRates[countryCode];

//   if (!shippingInfo) {
//     return res.status(404).json({
//       error: 'Country not found',
//       requestedCode: countryCode,
//       availableCountries: Object.keys(shippingRates)
//     });
//   }

//   res.json({
//     country: countryCode,
//     countryName: shippingInfo.name,
//     shippingRate: `${shippingInfo.price}.00 AED`,
//     priceInCents: shippingInfo.price * 100,
//     deliveryDays: shippingInfo.days,
//     shopifyFormat: {
//       service_name: `Shipping to ${shippingInfo.name}`,
//       service_code: `SHIP_${countryCode}`,
//       total_price: (shippingInfo.price * 100).toString(),
//       currency: 'AED'
//     }
//   });
// });

// // ✅ عرض جميع الأسعار
// app.get('/all-rates', (req, res) => {
//   const allRates = Object.entries(shippingRates).map(([code, info]) => ({
//     countryCode: code,
//     countryName: info.name,
//     rate: `${info.price}.00 AED`,
//     priceInCents: info.price * 100,
//     deliveryDays: info.days
//   }));

//   res.json({
//     totalCountries: allRates.length,
//     rates: allRates,
//     timestamp: new Date().toISOString()
//   });
// });

// // ✅ معالجة 404
// app.use((req, res) => {
//   res.status(404).json({
//     error: 'Endpoint not found',
//     path: req.path,
//     method: req.method,
//     availableEndpoints: [
//       'GET /',
//       'GET /health',
//       'GET /ping',
//       'POST /shipping-rates',
//       'GET /test-rates/:countryCode',
//       'GET /all-rates'
//     ]
//   });
// });

// // ✅ معالجة الأخطاء العامة
// app.use((err, req, res, next) => {
//   console.error('❌ Unhandled error:', err);
//   res.status(500).json({
//     error: 'Internal server error',
//     message: err.message
//   });
// });

// // ✅ بدء السيرفر - مع معالجة الأخطاء
// const server = app.listen(PORT, '0.0.0.0', () => {
//   console.log('\n🚀 ====================================');
//   console.log(`✅ Server running successfully`);
//   console.log(`📍 Port: ${PORT}`);
//   console.log(`🌐 Host: 0.0.0.0`);
//   console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
//   console.log('====================================');
//   console.log('\n📡 Available Endpoints:');
//   console.log(`   GET  / (Home)`);
//   console.log(`   GET  /health (Health Check)`);
//   console.log(`   POST /shipping-rates (Shopify)`);
//   console.log(`   GET  /test-rates/:code`);
//   console.log(`   GET  /all-rates`);
//   console.log('\n✅ Ready to receive requests!\n');
// });

// // ✅ معالجة إغلاق السيرفر بشكل صحيح
// process.on('SIGTERM', () => {
//   console.log('🛑 SIGTERM received, closing server gracefully...');
//   server.close(() => {
//     console.log('✅ Server closed');
//     process.exit(0);
//   });
// });

// process.on('SIGINT', () => {
//   console.log('🛑 SIGINT received, closing server gracefully...');
//   server.close(() => {
//     console.log('✅ Server closed');
//     process.exit(0);
//   });
// });

// module.exports = app;
//////////////////////////////////////////////////////////////////////////////
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ✅ هيكل التسعير الجديد - سهل التعديل
const shippingConfig = {
  // الدول مع أسعارها
  countries: {
    'QA': {
      name: 'Qatar',
      nameAr: 'قطر',
      basePrice: 11,           // السعر الأساسي للنصف كيلو الأول
      pricePerHalfKg: 2,       // سعر كل 0.5 كجم إضافي
      days: '2-3'
    },
    'BH': {
      name: 'Bahrain',
      nameAr: 'البحرين',
      basePrice: 10,
      pricePerHalfKg: 2,
      days: '2-3'
    },
    'OM': {
      name: 'Oman',
      nameAr: 'عُمان',
      basePrice: 13,
      pricePerHalfKg: 2.5,
      days: '3-4'
    },
    'KW': {
      name: 'Kuwait',
      nameAr: 'الكويت',
      basePrice: 11,
      pricePerHalfKg: 2,
      days: '2-3'
    },
    'IQ': {
      name: 'Iraq',
      nameAr: 'العراق',
      basePrice: 15,
      pricePerHalfKg: 3,
      days: '5-7'
    },
    'TN': {
      name: 'Tunisia',
      nameAr: 'تونس',
      basePrice: 20,
      pricePerHalfKg: 4,
      days: '7-10'
    },
    'DZ': {
      name: 'Algeria',
      nameAr: 'الجزائر',
      basePrice: 22,
      pricePerHalfKg: 4.5,
      days: '7-10'
    },
    'MA': {
      name: 'Morocco',
      nameAr: 'المغرب',
      basePrice: 22,
      pricePerHalfKg: 4.5,
      days: '7-10'
    },
    'GB': {
      name: 'United Kingdom',
      nameAr: 'بريطانيا',
      basePrice: 25,
      pricePerHalfKg: 5,
      days: '5-8'
    },
    'FR': {
      name: 'France',
      nameAr: 'فرنسا',
      basePrice: 25,
      pricePerHalfKg: 5,
      days: '5-8'
    },
    'NL': {
      name: 'Netherlands',
      nameAr: 'هولندا',
      basePrice: 25,
      pricePerHalfKg: 5,
      days: '5-8'
    },
    'DE': {
      name: 'Germany',
      nameAr: 'ألمانيا',
      basePrice: 25,
      pricePerHalfKg: 5,
      days: '5-8'
    },
    'IT': {
      name: 'Italy',
      nameAr: 'إيطاليا',
      basePrice: 25,
      pricePerHalfKg: 5,
      days: '5-8'
    },
    'SA': {
      name: 'Saudi Arabia',
      nameAr: 'السعودية',
      basePrice: 15,
      pricePerHalfKg: 3,
      days: '3-5'
    },
    'SD': {
      name: 'Sudan',
      nameAr: 'السودان',
      basePrice: 20,
      pricePerHalfKg: 4,
      days: '7-12'
    },
    'US': {
      name: 'United States',
      nameAr: 'أمريكا',
      basePrice: 30,
      pricePerHalfKg: 6,
      days: '7-14'
    },
    'CA': {
      name: 'Canada',
      nameAr: 'كندا',
      basePrice: 30,
      pricePerHalfKg: 6,
      days: '7-14'
    },
    'MR': {
      name: 'Mauritania',
      nameAr: 'موريتانيا',
      basePrice: 22,
      pricePerHalfKg: 4.5,
      days: '7-12'
    },
    'CH': {
      name: 'Switzerland',
      nameAr: 'سويسرا',
      basePrice: 28,
      pricePerHalfKg: 5.5,
      days: '5-8'
    },
    'ES': {
      name: 'Spain',
      nameAr: 'إسبانيا',
      basePrice: 25,
      pricePerHalfKg: 5,
      days: '5-8'
    }
  },

  // ✅ أنواع الخدمات - سهل التعديل
  serviceTypes: {
    'standard': {
      name: 'Standard Shipping',
      nameAr: 'شحن قياسي',
      multiplier: 1.0,        // السعر الأساسي
      code: 'STD'
    },
    'economy': {
      name: 'Economy Shipping',
      nameAr: 'شحن اقتصادي',
      multiplier: 0.8,        // تخفيض 20%
      code: 'ECO'
    },
    'premium': {
      name: 'Premium Shipping',
      nameAr: 'شحن سريع',
      multiplier: 1.5,        // زيادة 50%
      code: 'PRM'
    }
  }
};

// ✅ دالة حساب الوزن (تقريب لأقرب 0.5 كجم)
function roundWeight(grams) {
  const kg = grams / 1000;
  return Math.ceil(kg * 2) / 2; // تقريب لأعلى 0.5
}

// ✅ دالة حساب السعر حسب الوزن
function calculatePrice(countryCode, weightInGrams, serviceType = 'standard') {
  const country = shippingConfig.countries[countryCode];
  const service = shippingConfig.serviceTypes[serviceType];

  if (!country || !service) {
    return null;
  }

  const weightInKg = roundWeight(weightInGrams);
  
  // حساب عدد الأنصاف كيلوات الإضافية
  const extraHalfKgs = Math.max(0, (weightInKg - 0.5) * 2);
  
  // السعر = السعر الأساسي + (عدد الأنصاف × سعر النصف كيلو)
  const baseCalculation = country.basePrice + (extraHalfKgs * country.pricePerHalfKg);
  
  // تطبيق معامل نوع الخدمة
  const finalPrice = baseCalculation * service.multiplier;

  return {
    country: country.name,
    countryAr: country.nameAr,
    serviceType: service.name,
    serviceTypeAr: service.nameAr,
    weightInKg: weightInKg,
    basePrice: country.basePrice,
    pricePerHalfKg: country.pricePerHalfKg,
    calculatedPrice: Math.round(finalPrice * 100) / 100,
    priceInCents: Math.round(finalPrice * 100),
    deliveryDays: country.days,
    breakdown: {
      base: country.basePrice,
      extra: extraHalfKgs * country.pricePerHalfKg,
      serviceMultiplier: service.multiplier,
      beforeService: baseCalculation,
      final: finalPrice
    }
  };
}

// ✅ الصفحة الرئيسية
app.get('/', (req, res) => {
  res.status(200).json({
    status: '✅ النظام يعمل بنجاح',
    service: 'Shopify Dynamic Shipping Calculator',
    version: '2.0.0',
    features: [
      'حساب حسب الوزن',
      'حساب حسب الدولة',
      '3 أنواع خدمات شحن',
      'سهل التعديل والتخصيص'
    ],
    supportedCountries: Object.keys(shippingConfig.countries).length,
    serviceTypes: Object.keys(shippingConfig.serviceTypes),
    timestamp: new Date().toISOString()
  });
});

// ✅ Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// ✅ Endpoint رئيسي لـ Shopify
app.post('/shipping-rates', (req, res) => {
  try {
    console.log('\n📦 ===== Shopify Request =====');
    console.log('Time:', new Date().toISOString());

    const { rate } = req.body;

    if (!rate || !rate.destination || !rate.destination.country) {
      console.error('❌ Invalid request');
      return res.status(200).json({ rates: [] });
    }

    const countryCode = rate.destination.country.toUpperCase();
    const currency = rate.currency || 'AED';

    // حساب الوزن الكلي
    const items = rate.items || [];
    const totalWeight = items.reduce((sum, item) => 
      sum + (item.grams * item.quantity), 0
    );

    console.log(`🌍 Country: ${countryCode}`);
    console.log(`⚖️ Total Weight: ${totalWeight}g (${roundWeight(totalWeight)}kg)`);

    // التحقق من دعم الدولة
    if (!shippingConfig.countries[countryCode]) {
      console.log(`⚠️ Country not supported: ${countryCode}`);
      return res.status(200).json({ rates: [] });
    }

    // ✅ حساب الأسعار لجميع أنواع الخدمات
    const rates = [];
    
    // حالياً نرسل Standard فقط (يمكن إضافة الباقي لاحقاً)
    const standardCalc = calculatePrice(countryCode, totalWeight, 'standard');
    
    if (standardCalc) {
      rates.push({
        service_name: `Standard Shipping to ${standardCalc.country}`,
        service_code: `STD_${countryCode}`,
        total_price: standardCalc.priceInCents.toString(),
        currency: currency,
        description: `Delivery in ${standardCalc.deliveryDays} business days (${standardCalc.weightInKg}kg)`
      });
    }

    // يمكن إضافة Economy و Premium لاحقاً عند الحاجة:
    /*
    const economyCalc = calculatePrice(countryCode, totalWeight, 'economy');
    if (economyCalc) {
      rates.push({
        service_name: `Economy Shipping to ${economyCalc.country}`,
        service_code: `ECO_${countryCode}`,
        total_price: economyCalc.priceInCents.toString(),
        currency: currency,
        description: `Delivery in ${economyCalc.deliveryDays} business days (${economyCalc.weightInKg}kg)`
      });
    }

    const premiumCalc = calculatePrice(countryCode, totalWeight, 'premium');
    if (premiumCalc) {
      rates.push({
        service_name: `Premium Shipping to ${premiumCalc.country}`,
        service_code: `PRM_${countryCode}`,
        total_price: premiumCalc.priceInCents.toString(),
        currency: currency,
        description: `Express delivery in ${premiumCalc.deliveryDays} business days (${premiumCalc.weightInKg}kg)`
      });
    }
    */

    console.log(`✅ Calculated ${rates.length} rate(s)`);
    console.log('Response:', JSON.stringify({ rates }, null, 2));
    console.log('==============================\n');

    return res.status(200)
      .set('Content-Type', 'application/json')
      .json({ rates });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(200).json({ rates: [] });
  }
});

// ✅ اختبار حساب السعر
app.get('/calculate', (req, res) => {
  const { country, weight, service } = req.query;

  if (!country || !weight) {
    return res.status(400).json({
      error: 'Missing parameters',
      required: 'country (code) and weight (in grams)',
      example: '/calculate?country=QA&weight=2500&service=standard'
    });
  }

  const result = calculatePrice(
    country.toUpperCase(),
    parseInt(weight),
    service || 'standard'
  );

  if (!result) {
    return res.status(404).json({
      error: 'Country not found or invalid service type',
      availableCountries: Object.keys(shippingConfig.countries),
      availableServices: Object.keys(shippingConfig.serviceTypes)
    });
  }

  res.json({
    calculation: result,
    formattedPrice: `${result.calculatedPrice.toFixed(2)} AED`,
    shopifyFormat: {
      service_name: `${result.serviceType} to ${result.country}`,
      service_code: `${shippingConfig.serviceTypes[service || 'standard'].code}_${country.toUpperCase()}`,
      total_price: result.priceInCents.toString(),
      currency: 'AED'
    }
  });
});

// ✅ عرض جميع الدول والأسعار
app.get('/countries', (req, res) => {
  const weight = parseInt(req.query.weight) || 500; // وزن افتراضي 0.5 كجم
  const service = req.query.service || 'standard';

  const countriesWithPrices = Object.entries(shippingConfig.countries).map(([code, country]) => {
    const calc = calculatePrice(code, weight, service);
    return {
      code,
      name: country.name,
      nameAr: country.nameAr,
      basePrice: country.basePrice,
      pricePerHalfKg: country.pricePerHalfKg,
      deliveryDays: country.days,
      examplePrice: calc ? `${calc.calculatedPrice.toFixed(2)} AED` : 'N/A'
    };
  });

  res.json({
    totalCountries: countriesWithPrices.length,
    exampleWeight: `${weight}g (${roundWeight(weight)}kg)`,
    serviceType: service,
    countries: countriesWithPrices
  });
});

// ✅ عرض أنواع الخدمات
app.get('/services', (req, res) => {
  res.json({
    services: Object.entries(shippingConfig.serviceTypes).map(([key, service]) => ({
      key,
      name: service.name,
      nameAr: service.nameAr,
      multiplier: service.multiplier,
      description: `${service.multiplier === 1 ? 'Base price' : 
                    service.multiplier < 1 ? `${(1 - service.multiplier) * 100}% discount` :
                    `${(service.multiplier - 1) * 100}% premium`}`
    }))
  });
});

// ✅ اختبار شامل لدولة معينة
app.get('/test/:countryCode', (req, res) => {
  const countryCode = req.params.countryCode.toUpperCase();
  const country = shippingConfig.countries[countryCode];

  if (!country) {
    return res.status(404).json({
      error: 'Country not found',
      availableCountries: Object.keys(shippingConfig.countries)
    });
  }

  // حساب أمثلة لأوزان مختلفة
  const weightExamples = [500, 1000, 1500, 2000, 2500, 3000, 5000];
  const examples = {};

  Object.keys(shippingConfig.serviceTypes).forEach(serviceType => {
    examples[serviceType] = weightExamples.map(weight => {
      const calc = calculatePrice(countryCode, weight, serviceType);
      return {
        weight: `${weight}g`,
        roundedWeight: `${calc.weightInKg}kg`,
        price: `${calc.calculatedPrice.toFixed(2)} AED`,
        priceInCents: calc.priceInCents
      };
    });
  });

  res.json({
    country: {
      code: countryCode,
      name: country.name,
      nameAr: country.nameAr,
      basePrice: country.basePrice,
      pricePerHalfKg: country.pricePerHalfKg,
      deliveryDays: country.days
    },
    priceExamples: examples
  });
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /health',
      'POST /shipping-rates',
      'GET /calculate?country=QA&weight=2000&service=standard',
      'GET /countries?weight=1000&service=standard',
      'GET /services',
      'GET /test/:countryCode'
    ]
  });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// ✅ Start Server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\n🚀 ====================================');
  console.log(`✅ Dynamic Shipping Calculator Running`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`⏰ Started: ${new Date().toLocaleString()}`);
  console.log('====================================');
  console.log('\n📊 Configuration:');
  console.log(`   🌍 Countries: ${Object.keys(shippingConfig.countries).length}`);
  console.log(`   📦 Services: ${Object.keys(shippingConfig.serviceTypes).length}`);
  console.log('\n✅ Ready!\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

module.exports = app;