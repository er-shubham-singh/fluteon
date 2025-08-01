import api, { API_BASE_URL } from '../../../config/api';
import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE,
        GET_PAYMENT_HISTORY_REQUEST,
    GET_PAYMENT_HISTORY_SUCCESS,
    GET_PAYMENT_HISTORY_FAILURE,
  } from './ActionType';
  
  import axios from 'axios';
  
  export const createPayment = (reqData) => async (dispatch) => {
    console.log("create payment reqData ",reqData)
    try {
      dispatch({
        type: CREATE_PAYMENT_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${reqData.jwt}`,
        },
      };
  
      const { data } = await axios.post(`${API_BASE_URL}/api/payments/${reqData.orderId}`,reqData, config);
  console.log("datta",data)
  if(data.payment_link_url){
    window.location.href=data.payment_link_url;
  }
      dispatch({
        type: CREATE_PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PAYMENT_FAILURE,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
  



  export const updatePayment = (reqData) => {
    return async (dispatch) => {
      console.log("update payment reqData ",reqData)
      dispatch(updatePaymentRequest());
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${reqData.jwt}`,
          },
        };
        const response = await axios.get(`${API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`,config);
        console.log("updated data ---- ",response.data)
        dispatch(updatePaymentSuccess(response.data));
      } catch (error) {
        dispatch(updatePaymentFailure(error.message));
        console.log("catch error ",error)
      }
    };
  };

export const updatePaymentRequest = () => {
  return {
    type: UPDATE_PAYMENT_REQUEST,
  };
};

export const updatePaymentSuccess = (payment) => {
  return {
    type: UPDATE_PAYMENT_SUCCESS,
    payload: payment,
  };
};

export const updatePaymentFailure = (error) => {
  return {
    type: UPDATE_PAYMENT_FAILURE,
    payload: error,
  };
};

 
//   export const getPaymentHistory = (userId) => async (dispatch) => {
//   dispatch({ type: GET_PAYMENT_HISTORY_REQUEST });
//   try {
//     const { data } = await api.get(`/api/payments/payment-history/${userId}`);
//     dispatch({ type: GET_PAYMENT_HISTORY_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: GET_PAYMENT_HISTORY_FAILURE, payload: error.message });
//   }
// };

export const getPaymentHistory = (userId, orderId = null) => async (dispatch) => {
  dispatch({ type: GET_PAYMENT_HISTORY_REQUEST });
  try {
    let url = `/api/payments/payment-history/${userId}`;
    
    if (orderId) {
      url += `?orderId=${orderId}`;  // append query param
    }

    const { data } = await api.get(url);
    dispatch({ type: GET_PAYMENT_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PAYMENT_HISTORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
