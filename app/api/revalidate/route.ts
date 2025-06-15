import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  // Verifica che la richiesta provenga da una fonte autorizzata
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: "Accesso non autorizzato" },
      { status: 401 }
    );
  }

  try {
    // Revalida la homepage e tutte le pagine che dipendono dai dati
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Pagine rigenerate con successo"
    });
  } catch (err) {
    return NextResponse.json(
      {
        revalidated: false,
        now: Date.now(),
        message: `Errore durante la rigenerazione: ${
          err instanceof Error ? err.message : String(err)
        }`
      },
      { status: 500 }
    );
  }
}
