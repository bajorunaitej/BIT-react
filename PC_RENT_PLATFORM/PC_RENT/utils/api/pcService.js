export async function savePc(pc, cb) {
  //POST /server/api/pc/

  const promise = await fetch("/server/api/pc", {
    method: "post",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    // body: JSON.stringify(pc),
    body: pc,
  });
  const result = await promise.json();
  cb(result);
}

export async function getAllPcs(cb) {
  const promise = await fetch("/server/api/pc");
  const result = await promise.json();
  cb(result);
}

export async function getById(id, cb) {
  const promise = await fetch(`/server/api/pc/${id}`);
  const response = await promise.json();
  cb(response);
}
