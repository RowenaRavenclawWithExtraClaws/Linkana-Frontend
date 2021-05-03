import toastr from "toastr";

// display notification banner
const Notify = (msg, title, type) => {
  toastr.options = {
    positionClass: "toast-bottom-right",
    newestOnTop: true,
  };

  if (type === "success") toastr.success(msg, title);
  else if (type === "error") toastr.error(msg, title);
  else toastr.warning(msg, title);
};

export default Notify;
