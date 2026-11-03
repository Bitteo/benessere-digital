/** Titolare del trattamento. Nessun CAP: non è noto e non va inventato. */
export const NEWSLETTER_CONTROLLER_NAME = 'JIGO SRL'
export const NEWSLETTER_CONTROLLER_ADDRESS = 'Via Cesare Beccaria 11, Roma'
export const NEWSLETTER_CONTROLLER_VAT = '17075981005'

/** Riga legale obbligatoria nel footer delle email newsletter e di conferma. */
export const NEWSLETTER_FOOTER_LINE = 'JIGO SRL · Via Cesare Beccaria 11, Roma · P.IVA 17075981005'

/** Mittente di fallback se `NEWSLETTER_FROM` non è impostata. Dominio benessere.digital. */
export const DEFAULT_NEWSLETTER_FROM = 'newsletter@benessere.digital'

/** Oggetto dell'email di double opt-in. Stesso testo mostrato nel form dopo l'iscrizione. */
export const CONFIRMATION_EMAIL_SUBJECT =
  "Conferma l'iscrizione alla newsletter di benessere.digital"

/**
 * Risposta quando il contatto è già confermato.
 * Non include l'indirizzo né dati del contatto: il resto del POST resta `{ ok: true }`.
 */
export const ALREADY_SUBSCRIBED_MESSAGE = 'Sei già iscritto alla newsletter di benessere.digital.'

/** Testo del form dopo l'invio, prima del clic sul link di conferma. */
export function newsletterSignupSuccessCopy(from = DEFAULT_NEWSLETTER_FROM): string {
  return `Controlla la posta in arrivo e anche Spam/Promozioni: email da ${from}, oggetto «${CONFIRMATION_EMAIL_SUBJECT}». L'iscrizione è attiva solo dopo il clic sul link.`
}

export const PRIVACY_PATH = '/privacy'
