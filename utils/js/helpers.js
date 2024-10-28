import axios from "axios"
import { CONSTANTS, LOCAL_STOAGE_KEYS } from "../../config/constants"


export const postRequest = async (url, body = {}, withToken = true) => {
  const apiResponseObj = {
    isSuccess: false,
    apiResponse: null,
  }
  try {
    const BASE_URL = CONSTANTS.API_URL
    let response

    if (withToken) {
      const accesssToken = localStorage.getItem(LOCAL_STOAGE_KEYS.ACCESS_TOKEN)

      response = await axios.post(`${BASE_URL}${url}`, body, {
        headers: {
          Authorization: `Bearer ${accesssToken}`,
        },
      })
    } else {
      response = await axios.post(`${BASE_URL}${url}`, body)
    }

    apiResponseObj.isSuccess = true
    apiResponseObj.apiResponse = response.data
    return apiResponseObj
  } catch (error) {
    apiResponseObj.apiResponse = error
    return apiResponseObj
  }
}

export const makePostRequest = async (url, body = {}, withToken = true) => {
  try {
    const response = await postRequest(url, body, withToken)

    if (response.isSuccess) {
      return response.apiResponse
    } else {
      if (response.apiResponse?.status == 401) {
        showErrorToast("Unauthorized!")
        return { success: false, message: "Unauthorized!" }
      } else {
        return { success: false, message: "Something went wrong..." }
      }
    }
  } catch (error) {
    return { success: false, message: "Something went wrong..." }
  }
}

export const showErrorToast = (message) => {

}
export const showSuccessToast = (message) => {
  
}

export function formatDateWithSymbol(dateInput, symbol = "-") {
  if (typeof dateInput === "string") {
    dateInput = new Date(dateInput)
  }
  const month = dateInput.toLocaleString("en-US", { month: "short" })
  const date = dateInput.getDate()
  const year = dateInput.getFullYear()

  const formattedDate = `${date}${symbol}${month}${symbol}${year}`

  return formattedDate
}

export function makeValidString(str) {
  try {
    if (typeof str === "string") {
      return str
    } else if (typeof str == "number") {
      return str.toString()
    } else if (typeof str == "boolean") {
      return `${str}`
    } else if (typeof str == "bigint") {
      return `${str}`
    } else {
      return ""
    }
  } catch (error) {
    return ""
  }
}
