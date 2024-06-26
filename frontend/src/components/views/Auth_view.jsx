import React from "react";
import { useNavigate } from "react-router-dom";

const Auth_view = ({
  formID,
  formTitle,
  userData,
  handleChange,
  handleSubmit,
  submitButtonLabel,
  additionalText,
  additionalLink,
  additionalLinkText,
  loading
}) => {
  const navigate = useNavigate();
  return (
    <main id={formID}>
      <div className="wrapper">
        <h2>{formTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              placeholder="Enter your email"
              type="email"
              name="userEmail"
              value={userData.userEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              placeholder="Enter your password"
              type="password"
              name="userPassword"
              value={userData.userPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box button">
            {loading ? <button type="submit" disabled style={{pointerEvents:"none"}}>{submitButtonLabel}</button> : <button type="submit">{submitButtonLabel}</button>}
          </div>
          <div className="text">
            <h3>
              {additionalText} <button onClick={()=>{navigate(additionalLink)}}>{additionalLinkText}</button>
            </h3>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Auth_view;
