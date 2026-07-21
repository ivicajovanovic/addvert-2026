import { NextResponse } from "next/server"
import { SITE_URL } from "@/lib/site-config"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SUCCESS_RESPONSE = { message: "Potvrdite prijavu putem emaila." }

interface NewsletterPayload {
  email?: unknown
  consent?: unknown
  company?: unknown
}

function parsePositiveInteger(value: string | undefined): number | null {
  if (!value || !/^\d+$/.test(value)) {
    return null
  }

  const parsed = Number(value)
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null
}

function getBrevoConfiguration() {
  const apiKey = process.env.BREVO_API_KEY
  const listId = parsePositiveInteger(process.env.BREVO_NEWSLETTER_LIST_ID)
  const templateId = parsePositiveInteger(process.env.BREVO_DOI_TEMPLATE_ID)

  if (!apiKey || !listId || !templateId) {
    return null
  }

  return { apiKey, listId, templateId }
}

function getRequestPayload(payload: NewsletterPayload) {
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : ""
  const consent = payload.consent === true
  const company = typeof payload.company === "string" ? payload.company.trim() : ""

  return { email, consent, company }
}

export async function POST(request: Request) {
  let payload: NewsletterPayload

  try {
    const body: unknown = await request.json()

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ message: "Neispravan zahtev." }, { status: 400 })
    }

    payload = body as NewsletterPayload
  } catch {
    return NextResponse.json({ message: "Neispravan zahtev." }, { status: 400 })
  }

  const { email, consent, company } = getRequestPayload(payload)

  if (company) {
    return NextResponse.json(SUCCESS_RESPONSE, { status: 201 })
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254 || !consent) {
    return NextResponse.json({ message: "Neispravan zahtev." }, { status: 400 })
  }

  const configuration = getBrevoConfiguration()

  if (!configuration) {
    return NextResponse.json({ message: "Potvrda trenutno nije dostupna." }, { status: 500 })
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": configuration.apiKey,
      },
      body: JSON.stringify({
        email,
        includeListIds: [configuration.listId],
        templateId: configuration.templateId,
        redirectionUrl: `${SITE_URL}/vodic-spreman`,
      }),
    })

    if (!response.ok) {
      const responseBody = await response.text()
      console.error("Brevo DOI request failed", {
        status: response.status,
        responseBody,
      })
      return NextResponse.json({ message: "Potvrda trenutno nije dostupna." }, { status: 500 })
    }
  } catch (error) {
    console.error("Brevo DOI request could not be completed", {
      error: error instanceof Error ? error.message : "Unknown error",
    })
    return NextResponse.json({ message: "Potvrda trenutno nije dostupna." }, { status: 500 })
  }

  return NextResponse.json(SUCCESS_RESPONSE, { status: 201 })
}
