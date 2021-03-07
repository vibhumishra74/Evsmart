import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./contactus.css";

const Contact = () => {
  const { register, errors, handleSubmit, reset } = useForm();

  const toastifySuccess = () => {
    toast("Form sent!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  const REACT_APP_SERVICE_ID = "service_99smg2h";
  const REACT_APP_TEMPLATE_ID = "template_x636xcg";
  const REACT_APP_USER_ID = "user_8OSbcGGMSuhSSdAxAI41a";

  const onSubmit = async (data) => {
    // Send form email
    try {
      const templateParams = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      };

      await emailjs.send(
        REACT_APP_SERVICE_ID,
        REACT_APP_TEMPLATE_ID,
        templateParams,
        REACT_APP_USER_ID
      );

      reset();
      toastifySuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="ContactForm contactus"
      // style={{
      //   backgroundImage: `url(${require("./img/ev.jpg")})`,
      //   height: "100px",
      // }}
      // style={{
      //   width: "100%",
      //   height: "50vh",
      //   backgroundImage: `url(${image})`,
      // }}
    >
      {/* <img
        src="/images/ev.jpg"
        alt="contact"
        style={{
          width: "100%",
          height: "50vh",
          backgroundImage: `{url(/images/en.jpg)}`,
        }}
      /> */}
      {/* <img src={backgroundImage} alt="ev images" /> */}
      <div className="container contactus__background">
        <div className="row">
          <div className="col-12 text-center">
            <div className="contactForm">
              <form
                id="contact-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* Row 1 of form */}
                <div className="row formRow">
                  <div className="col-6 p-4">
                    <input
                      type="text"
                      name="name"
                      ref={register({
                        required: {
                          value: true,
                          message: "Please enter your name",
                        },
                        maxLength: {
                          value: 30,
                          message: "Please use 30 characters or less",
                        },
                      })}
                      className="form-control formInput"
                      placeholder="Name"
                    ></input>
                    {errors.name && (
                      <span className="errorMessage">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="col-6 p-4">
                    <input
                      type="email"
                      name="email"
                      ref={register({
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                      className="form-control formInput"
                      placeholder="Email address"
                    ></input>
                    {errors.email && (
                      <span className="errorMessage">
                        Please enter a valid email address
                      </span>
                    )}
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className="row formRow">
                  <div className="col p-4">
                    <input
                      type="text"
                      name="subject"
                      ref={register({
                        required: {
                          value: true,
                          message: "Please enter a subject",
                        },
                        maxLength: {
                          value: 75,
                          message: "Subject cannot exceed 75 characters",
                        },
                      })}
                      className="form-control formInput p-4"
                      placeholder="Subject"
                    ></input>
                    {errors.subject && (
                      <span className="errorMessage">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* Row 3 of form */}
                <div className="row formRow">
                  <div className="col p-4">
                    <textarea
                      rows={3}
                      name="message"
                      ref={register({
                        required: true,
                      })}
                      className="form-control formInput"
                      placeholder="Message"
                    ></textarea>
                    {errors.message && (
                      <span className="errorMessage">
                        Please enter a message
                      </span>
                    )}
                  </div>
                </div>
                <button
                  className="submit-btn contact__button contact__button_bottom_bg"
                  type="submit"
                >
                  {" "}
                  <div className="submit__text">SUBMIT</div>
                </button>
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
