import http from "k6/http";
import { check, sleep, group } from "k6";
const BASE_URL = "https://reqres.in/api";

export default function () {
  group("Create with valid request should success", function () {
    const FULL_URL = BASE_URL + "/users";
    const payload = JSON.stringify({
      email: "miaaprilia2803@gmail.com",
      password: "test123",
    });
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let res = http.post(FULL_URL, payload, params);

    check(res, {
      "response code was 201": (res) => res.status == 201,
    });
    check(res, {
      "response email should same with request": (res) => {
        const response = JSON.parse(res.body);
        return response.email === "miaaprilia2803@gmail.com";
      },
    });
    check(res, {
      "response password should same with request": (res) => {
        const response = JSON.parse(res.body);
        return response.password === "test123";
      },
    });
  });
  sleep(1);

  group("Update with valid request should success", function () {
    const FULL_URL = BASE_URL + "/users/2";
    const payload = JSON.stringify({
      email: "miaaprilia2803@gmail.com",
      password: "testing123",
    });
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let res = http.put(FULL_URL, payload, params);

    check(res, {
      "response code was 200": (res) => res.status == 200,
    });
    check(res, {
      "response email should same with request": (res) => {
        const response = JSON.parse(res.body);
        return response.email === "miaaprilia2803@gmail.com";
      },
    });
    check(res, {
      "response password should same with request": (res) => {
        const response = JSON.parse(res.body);
        return response.password === "testing123";
      },
    });
  });
}
