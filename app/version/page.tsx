const GetVersion = () => {
  const appVersion = process.env.APP_VERSION;

  return <div>QuillFire version: {appVersion}</div>;
};

export default GetVersion;
