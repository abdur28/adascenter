import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, car, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны." },
        { status: 400 }
      );
    }

    const sent = await sendContactFormEmail({ name, phone, car, message });

    if (!sent) {
      return NextResponse.json(
        { error: "Не удалось отправить. Попробуйте позже." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Заявка отправлена!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера." },
      { status: 500 }
    );
  }
}
