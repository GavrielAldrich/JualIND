import React from 'react';

const Form_view = ({ 
        formID, formTitle, userData, handleChange, 
        handleSubmit, submitButtonLabel, additionalText, 
        additionalLink, additionalLinkText }) => {
  return (
    <div id={formID}>
      <div className='wrapper'>
        <h2>{formTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              placeholder='Enter your email'
              type="email"
              name='userEmail'
              value={userData.userEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              placeholder='Enter your password'
              type="password"
              name='userPassword'
              value={userData.userPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box button">
            <button type="submit">{submitButtonLabel}</button>
          </div>
          <div className="text">
            <h3>{additionalText} <a href={additionalLink}>{additionalLinkText}</a></h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form_view;
