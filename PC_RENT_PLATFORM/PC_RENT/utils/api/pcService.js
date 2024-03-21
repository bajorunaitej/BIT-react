export async function savePc(pc, cb) {
  //POST /server/api/pc/

  const promise = await fetch("/server/api/pc/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pc),
  });
  const result = await promise.json();
  cb(result);
}

export async function getAllPcs(cb) {
  const promise = await fetch("/server/api/pc");
  const result = await promise.json();
  cb(result);
}
