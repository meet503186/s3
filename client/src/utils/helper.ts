export const queryString = (queryObject: any) => {
  let obj: any = {};

  Object.keys(queryObject).forEach((_key) => {
    const data = queryObject[_key];

    if (typeof data === "object") {
      if (_key === "location") {
        obj[_key] = data?.name;
        obj["id"] = data?.id;
        obj["type"] = data?.type;
      } else {
        obj[_key] = data?.value;
      }
    } else {
      obj[_key] = data;
    }
  });

  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      if (Array.isArray(obj[p])) {
        const val = obj[p].map((item: any) => item.label || item);
        val.length &&
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val));
        continue;
      }
      obj[p] !== undefined &&
        obj[p] !== "" &&
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
};
