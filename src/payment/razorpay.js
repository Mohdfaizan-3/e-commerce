import { toast } from "react-toastify";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const makePayment = async (total, email, navigate) => {
  const res = await loadRazorpayScript();

  if (!res) {
    toast.error("Razorpay SDK failed to load. Are you online?");
    return;
  }

  var options = {
    key: "rzp_test_e7PCJSeJAAiKC8",
    amount: total * 100 * 84, // 50000 paise = INR 500, amount in paisa
    currency: "INR",
    name: "CRWN-SHOP",
    description: "Test Transaction",
    image: "https://example.com/logo.png", // your logo url
    handler: function (response) {
      toast.success("Payment successful!");
      navigate("/");
    },
    prefill: {
      name: "",
      email: email,
      contact: "",
    },
    notes: {
      address: "Some address",
    },
    theme: {
      color: "#F37254",
    },
  };

  var rzp1 = new window.Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    toast.error("Payment failed. Please try again.");
    console.error(response.error.code);
    console.error(response.error.description);
    console.error(response.error.source);
    console.error(response.error.step);
    console.error(response.error.reason);
    console.error(response.error.metadata.order_id);
    console.error(response.error.metadata.payment_id);
  });
  rzp1.open();
};
