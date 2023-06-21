const lookUps = {
  he: {
    triggers: "טריגרים",
    "Config Conditions": "תנאי הגדרות ",
    city: "עיר",
    street: "רחוב ",
    number: "מספר",
    latitude: "קו רוחב",
    longitude: "קו אורך",
    createdAt: "נוצר בתאריך",
    updatedAt: "עודכן בתאריך",
    IdentifierID: "זיהוי",
    trigger: "טריגר",
    meaning: "טריגר ",
    system: "מערכת",
    status: "מעמד",
    additionalIdentifier: "זיהוי נוסף",
    "config Condition ID": "מזהה תנאי הגדרות",
    systemId: "מזהה המערכת",
    previousSystemId: "מזהה המערכת הקודמת",
    type: "סוג",
    triggerName: "שם הטריגר",
    valueType: "סוג הערך",
    measuredValue: "ערך מודד",
    Level: "רמה",
    Identifiers: "מזהים",
    Sensors: "חיישנים ",
    SystemNumber: "מספר המערכת",
    Actions: "פעולות",
    Parameters: "פרמטרים",
    Activity: "פעילות",
    Meaning: "משמעות",
    Name: "שם",
    Unit: "יחידה",
    Ranges: "טווחים",
    "Checked Items": "פריטים שנבדקו",
    Expand: "להרחיב",
    Message: "הודעה",
    Min: "מינימום",
    Max: "מקסימום",
    edit: "לערוך",
    "Add Range": "הוסף טווח",
    Delete: "למחוק",
    "Translation error": "שגיאת תרגום",
    "Change language": "שנה שפה",
  },
  en: {
    Delete: "Delete",
    "Add Range": "Add Range",
    edit: "Edit",
    Message: "Message",
    Min: "Min",
    Max: "Max",
    Actions: "Actions",
    Expand: "Expand",
    "Checked Items": "Checked Items",
    Ranges: "Ranges",
    Unit: "Unit",
    Name: "Name",
    Meaning: "Meaning",
    Activity: "Activity",
    Parameters: "Parameters",
    SystemNumber: "System Number",
    Sensors: "Sensors",
    Identifiers: "Identifiers",
    triggers: "Triggers",
    "Config Conditions": "Config Conditions",
    Level: "Level",
    valueType: "value Type",
    measuredValue: "Measured Value",
    triggerType: "Trigger Type",
    sensorName: "Sensor Name",
    sensorType: "Sensor Type",
    triggerName: "Trigger Name",
    System: "System Type",
    type: "type",
    previousSystemId: "Previous System Id",
    systemId: "System ID",
    "config Condition ID": "config Condition ID",
    status: "Status",
    city: "City",
    street: "Street",
    number: "Number",
    latitude: "Latitude",
    longitude: "Longitude",
    createdAt: "Created",
    updatedAt: "Updated",
    IdentifierID: "Identifier ID",
    additionalIdentifier: "Additional Identifier",
    trigger: "Trigger",
    meaning: "Meaning",
    system: "System",
    "Translation error": "Translation error",
    "Change language": "Change language",
  },
  ar: {
    Delete: "حذف",
    "Add Range": "اضافة حد",
    edit: "تعديل",
    Message: "رسالة",
    Min: "حد ادنى",
    Max: "حد اعلى",
    Actions: "إجراءات",
    Expand: "تضخيم",
    "Checked Items": "العناصر المختارة",
    Ranges: "حدود",
    Unit: "وحدة",
    Name: "اسم",
    Meaning: "معنى",
    Activity: "فعليات",
    Parameters: "المعاملات",
    SystemNumber: "رقم النظام",
    Sensors: "حساسات",
    Identifiers: "المعرفين",
    triggers: "المؤثرات",
    "Config Conditions": " شروط التكوين ",
    Level: "مستوى",
    valueType: "نوع القيمة",
    measuredValue: "القيمة المحسوبة",
    triggerName: "اسم المؤثر",
    type: "نوع",
    previousSystemId: "رقم النظام السابق",
    systemId: "رقم النظام",
    "config Condition ID": "معرف شرط التكوين",
    status: "الوضع",
    city: "المدينة",
    street: "الشارع",
    number: "الرقم",
    latitude: "خطوط الطول",
    longitude: "خطوط العرض",
    createdAt: "تم إنشاؤه",
    updatedAt: "تم تعديله",
    IdentifierID: "رقم المعرف",
    additionalIdentifier: "معرف اضافي",
    trigger: "المؤثر",
    meaning: "المعنى",
    system: "النظام",
    "Translation error": "خطأ في الترجمة",
    "Change language": "تغيير اللغة",
  },
};

export default (language, word) => {
  let lang = language;
  if (!lookUps[lang]) lang = "en";
  return lookUps[lang][word] || lookUps[lang]["Translation error"];
};