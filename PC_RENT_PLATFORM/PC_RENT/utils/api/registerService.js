export async function register(registerData, cb) {
  console.log(registerData);
  const promise = await fetch("/server/api/user/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  const result = await promise.json();
  cb(result);
}
