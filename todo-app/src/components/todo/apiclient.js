const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error("Please reload the app");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};
export default apiRequest;

const API_URL = "http://localhost:3500/todos";

export async function saveItem(item) {
  let errMsg = null;
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item)
    });
    // catch all error that cannot be catch
    // example
    if (!res.ok) throw Error("Please reload the app");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
}

export async function updateItem(itemId, updateFields) {
  let errMsg = null;
  try {
    const res = await fetch(`${API_URL}/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFields),
    });
    if (!res.ok) throw Error("Please reload the app");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
}

export async function deleteItem(id) {
  let errMsg = null;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw Error("Please reload the app");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
}

//deleteOptions = { method: 'DELETE' };
