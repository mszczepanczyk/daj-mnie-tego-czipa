const fetch = require('node-fetch')

const settings = require('./settings')

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function callApi (url, body) {
  return fetch(url, {
    credentials: 'include',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:88.0) Gecko/20100101 Firefox/88.0',
      Accept: 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Content-Type': 'application/json;charset=utf-8',
      'X-Csrf-Token': settings.token,
      Cookie: `patient_sid=${settings.patientSID}`
    },
    referrer: 'https://pacjent.erejestracja.ezdrowie.gov.pl/rezerwacja-wizyty',
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json())
}

function getSlots () {
  return callApi(
    'https://pacjent.erejestracja.ezdrowie.gov.pl/api/calendarSlots/find',
    {
      dayRange: {
        from: settings.dateFrom,
        to: settings.dateTo
      },
      geoId: settings.geoId,
      prescriptionId: settings.prescriptionId,
      voiId: '14', // ?
      vaccineTypes: settings.vaccineTypes
    }
  ).then(res => res.list)
}

function confirm (slotId) {
  return callApi(
    `https://pacjent.erejestracja.ezdrowie.gov.pl/api/calendarSlot/${slotId}/confirm`,
    {
      prescriptionId: settings.prescriptionId
    }
  )
}

async function main () {
  while (true) {
    const slots = await getSlots()
    console.log(new Date(), `Found ${slots.length} slots`)

    if (slots.length > 0) {
      console.log(slots)

      let confirmed = false
      for (const slot of slots) {
        if (slot.dose === settings.dose) {
          if (settings.confirm) {
            const res = await confirm(slot.id)
            console.log(res)
            if (!res.errorId) {
              confirmed = true
              break
            }
          }
        }
      }
      if (confirmed) {
        break
      }
    }

    await sleep((Math.random() + 0.5) * settings.intervalMs)
  }
}
main()
