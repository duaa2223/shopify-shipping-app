# 🚢 Shopify Custom Shipping Calculator

تطبيق Node.js لحساب تكلفة الشحن المخصصة لمتجر Shopify حسب كل دولة

## ✨ المميزات

- ✅ حساب الشحن لأكثر من 20 دولة
- ✅ أسعار مخصصة لكل دولة
- ✅ دعم العملة الإماراتية (AED)
- ✅ سهل التعديل والتخصيص
- ✅ متوافق مع Shopify Carrier Service API

## 📦 التثبيت

### المتطلبات
- Node.js 18 أو أحدث
- npm أو yarn

### الخطوات

```bash
# 1. استنساخ المشروع
git clone https://github.com/YOUR_USERNAME/shopify-shipping-app.git
cd shopify-shipping-app

# 2. تثبيت المكتبات
npm install

# 3. تشغيل السيرفر
npm start
```

السيرفر سيعمل على: `http://localhost:3000`

## 🧪 الاختبار

### اختبار محلي

```bash
# اختبار الصفحة الرئيسية
curl http://localhost:3000/

# اختبار سعر دولة معينة
curl http://localhost:3000/test-rates/AE

# عرض جميع الأسعار
curl http://localhost:3000/all-rates
```

### اختبار Postman

استخدم هذا الطلب للاختبار:

**POST** `http://localhost:3000/shipping-rates`

**Body:**
```json
{
  "rate": {
    "destination": {
      "country": "AE",
      "city": "Abu Dhabi",
      "province": "Abu Dhabi"
    },
    "items": [{
      "quantity": 1,
      "grams": 800,
      "price": 15.99
    }]
  }
}
```

## 🌍 الدول المدعومة

| الدولة | الكود | السعر (AED) | مدة التوصيل |
|--------|------|------------|-------------|
| الإمارات | AE | 10.00 | 2-4 أيام |
| السعودية | SA | 15.00 | 3-5 أيام |
| الأردن | JO | 12.00 | 4-7 أيام |
| الكويت | KW | 12.00 | 3-5 أيام |
| قطر | QA | 12.00 | 3-5 أيام |
| البحرين | BH | 12.00 | 3-5 أيام |
| عمان | OM | 12.00 | 3-5 أيام |
| مصر | EG | 20.00 | 5-8 أيام |
| لبنان | LB | 18.00 | 5-8 أيام |
| أمريكا | US | 35.00 | 7-14 يوم |
| بريطانيا | GB | 30.00 | 5-10 أيام |

*للدول غير المدرجة: 40 AED (شحن دولي)*

## ⚙️ التخصيص

### تعديل أسعار الشحن

افتح ملف `server.js` وعدّل القسم التالي:

```javascript
const shippingRates = {
  'AE': { name: 'الإمارات', price: 10.00, currency: 'AED', deliveryDays: '2-4' },
  'SA': { name: 'السعودية', price: 15.00, currency: 'AED', deliveryDays: '3-5' },
  // أضف المزيد من الدول هنا...
};
```

### إضافة دولة جديدة

```javascript
'TR': { name: 'تركيا', price: 25.00, currency: 'AED', deliveryDays: '5-10' }
```

## 🚀 النشر على Render

### 1. رفع الكود إلى GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/shopify-shipping-app.git
git push -u origin main
```

### 2. إنشاء Web Service على Render

1. اذهب إلى [render.com](https://render.com)
2. New → Web Service
3. اربط GitHub repository
4. اختر المشروع
5. اضبط الإعدادات:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. اضغط "Create Web Service"

### 3. احصل على الرابط

سيكون الرابط بهذا الشكل:
```
https://shopify-shipping-calculator.onrender.com
```

## 🔗 الربط مع Shopify

### المتطلبات
- حساب Shopify (خطة Advanced أو Plus)
- صلاحيات Admin API

### الخطوات

1. **إنشاء Custom App في Shopify:**
   - Settings → Apps and sales channels → Develop apps
   - Create an app
   - فعّل: `write_shipping` و `read_shipping`
   - احفظ Admin API access token

2. **إنشاء Carrier Service:**

```bash
curl -X POST \
  https://YOUR-STORE.myshopify.com/admin/api/2024-01/carrier_services.json \
  -H 'Content-Type: application/json' \
  -H 'X-Shopify-Access-Token: YOUR_ACCESS_TOKEN' \
  -d '{
    "carrier_service": {
      "name": "Custom Shipping Calculator",
      "callback_url": "https://your-app.onrender.com/shipping-rates",
      "service_discovery": true,
      "carrier_service_type": "api",
      "format": "json"
    }
  }'
```

3. **إعداد Shipping Zone:**
   - Settings → Shipping and delivery
   - اختر Shipping zone
   - Add rate → Use carrier or app to calculate rates
   - اختر تطبيقك

## 📊 API Endpoints

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/` | معلومات التطبيق |
| GET | `/health` | Health check |
| POST | `/shipping-rates` | حساب الشحن (Shopify webhook) |
| GET | `/test-rates/:code` | اختبار سعر دولة |
| GET | `/all-rates` | عرض جميع الأسعار |

## 🐛 استكشاف الأخطاء

### المشكلة: لا تظهر أسعار الشحن

**الحل:**
1. تحقق من اللوجات في Render
2. تأكد من `callback_url` صحيح
3. تحقق من Carrier Service مفعّل

### المشكلة: أسعار خاطئة

**الحل:**
1. تأكد من أن `total_price` بالفلس (× 100)
2. راجع كود الدولة (ISO 3166-1 alpha-2)

## 📝 ملاحظات

- الأسعار يجب أن تكون بأصغر وحدة من العملة (فلس)
- 10 AED = 1000 فلس
- كود الدولة يجب أن يكون بصيغة ISO (حرفين)

## 📞 الدعم

- Shopify Docs: https://shopify.dev/docs/api/admin-rest/latest/resources/carrierservice
- Render Docs: https://render.com/docs

## 📄 الترخيص

MIT License - يمكنك استخدام وتعديل الكود بحرية

## 👨‍💻 المطور

تم التطوير بواسطة [اسمك]

---

⭐ إذا أعجبك المشروع، لا تنسى إعطاءه نجمة على GitHub!