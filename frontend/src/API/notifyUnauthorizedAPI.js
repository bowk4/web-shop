import axios from "axios";
import toast from "react-hot-toast";

const notifyUnauthorizedAPI = async (id, category, email) => {
  const token = localStorage?.getItem("token");

  axios
    .post(
      "/api/notify-me-unauthorized",
      {
        id: id,
        category: category,
        email: email,
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

export default notifyUnauthorizedAPI;
