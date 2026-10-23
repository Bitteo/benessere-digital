const faqs = [
  {
    question: "Cos'è il benessere digitale e perché è importante?",
    answer:
      "Il benessere digitale si riferisce a un utilizzo equilibrato e consapevole della tecnologia, finalizzato a migliorare la qualità della vita senza compromettere la salute mentale e fisica. È importante perché un uso eccessivo o disorganizzato dei dispositivi digitali può portare a stress, ansia, problemi di sonno e diminuzione della produttività. Trovare un equilibrio digitale aiuta a migliorare il benessere generale e a mantenere un rapporto sano con la tecnologia.",
  },
  {
    question: 'Cosa significa fare un digital detox?',
    answer:
      "Il digital detox è un periodo di tempo in cui si riduce o si elimina completamente l'uso di dispositivi digitali come smartphone, tablet, computer e social media. L'obiettivo è ridurre lo stress, migliorare la concentrazione e ristabilire un contatto più autentico con la realtà circostante. Un digital detox può durare da poche ore a diversi giorni, a seconda delle necessità personali.",
  },
  {
    question: 'Quali sono i principali segnali di una dipendenza da tecnologia?',
    answer:
      "I principali segnali di una dipendenza da tecnologia includono l'incapacità di limitare il tempo passato online, ansia o irritabilità quando non si può accedere a dispositivi digitali, trascurare le relazioni personali e le attività quotidiane, e difficoltà a dormire a causa dell'uso eccessivo dello schermo. Riconoscere questi segnali è fondamentale per intraprendere azioni volte a migliorare il benessere digitale.",
  },
  {
    question: 'Come posso migliorare il mio benessere digitale senza rinunciare completamente alla tecnologia?',
    answer:
      "Per migliorare il benessere digitale senza abbandonare completamente la tecnologia, si possono adottare abitudini come usare app per il monitoraggio del tempo online, impostare delle pause digitali regolari, fare esercizi di mindfulness, e limitare l'uso dei social media. È utile anche definire orari specifici per controllare le email e dedicare del tempo per attività che non coinvolgono dispositivi digitali.",
  },
  {
    question: 'Quali sono i migliori consigli per un digital detox efficace?',
    answer:
      "Per un digital detox efficace, è consigliabile stabilire limiti di tempo per l'uso dei dispositivi, disattivare le notifiche inutili, dedicarsi ad attività offline come la lettura, l'esercizio fisico o la meditazione, e impostare delle regole per l'uso della tecnologia a casa. Creare delle routine senza tecnologia prima di dormire può anche migliorare la qualità del sonno e ridurre lo stress.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="section-md border-b border-border scroll-mt-24">
      <div className="container-md padding-global">
        <h2 className="text-h2 sm:text-h3 mb-8" style={{ fontFamily: 'FuturaPT-Demi, sans-serif' }}>
          Domande <span className="text-pixel">frequenti</span>
        </h2>
        <div className="flex flex-col divide-y divide-border border-y border-border">
          {faqs.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-primary">
                <span>{item.question}</span>
                <span className="text-cta-blue group-open:rotate-45 transition-transform" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 text-base text-primary opacity-70 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
