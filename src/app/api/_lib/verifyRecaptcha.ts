export async function verifyRecaptcha(token: string, secretKey: string) {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    }
  );

  const data = await response.json();
  return data;
}
