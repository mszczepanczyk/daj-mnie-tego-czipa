exports.token = ''
exports.prescriptionId = ''
exports.patientSID = ''
// exports.vaccineTypes = ["cov19.pfizer", "cov19.astra_zeneca", "cov19.johnson_and_johnson", "cov19.moderna"];
exports.vaccineTypes = ['cov19.pfizer']
exports.dateFrom = '2021-04-26'
exports.dateTo = '2021-04-30'
exports.intervalMs = 1000
exports.dose = 1 // 1 or 2
exports.geoId = '1465011' // parentId https://pacjent.erejestracja.ezdrowie.gov.pl/teryt/api/woj/14/simc?namePrefix=Warszawa
exports.voiId = '14'
// exports.geoId = '0264011' // parentId https://pacjent.erejestracja.ezdrowie.gov.pl/teryt/api/woj/02/simc?namePrefix=Wroc%C5%82aw
// exports.voiId = '02'
exports.confirm = true; // just query don't book if false
