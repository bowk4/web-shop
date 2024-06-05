import axios from "axios";
import toast from "react-hot-toast";

const notifyAuthorizedAPI = async (id, category, customerNo) => {
  const token = localStorage?.getItem("token");

  axios
    .post(
      "/api/notify-me-authorized",
      {
        id: id,
        category: category,
        customerNo: customerNo,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      toast.success("You have subscribed on product successfully");
    })
    .catch((error) => {
      console.error("Error sending notification request:", error);
      toast.error("Sorry, something went wrong");
    });
};

export default notifyAuthorizedAPI;
