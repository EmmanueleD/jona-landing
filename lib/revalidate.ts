/**
 * Servizio per la revalidazione on-demand delle pagine
 * Questo servizio chiama l'API di revalidazione per rigenerare le pagine statiche
 * dopo che sono state apportate modifiche ai dati
 */

// Funzione per revalidare le pagine
export async function revalidatePages(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Ottieni il secret dalle variabili d'ambiente del browser
    const secret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET;

    if (!secret) {
      console.warn("NEXT_PUBLIC_REVALIDATION_SECRET non è definito");
      return {
        success: false,
        message: "Configurazione incompleta per la revalidazione"
      };
    }

    // Chiama l'API di revalidazione
    const response = await fetch(`/api/revalidate?secret=${secret}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Errore durante la revalidazione"
      };
    }

    return {
      success: true,
      message: data.message || "Pagine rigenerate con successo"
    };
  } catch (error) {
    console.error("Errore durante la revalidazione:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Errore sconosciuto durante la revalidazione"
    };
  }
}
