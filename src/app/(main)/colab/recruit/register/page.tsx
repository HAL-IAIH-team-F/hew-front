import ColabRegisterForm from "@/(main)/colab/recruit/register/ColabRegisterForm";


const LoginRegister: React.FC = () => {
  return (
    <div style={{
        display: "flex",
        margin: "10px 0px -10px 20px"
    }}>
        <div style={{
            width: "65%",
            margin: "0 15px 0 0",
            padding: "15px",
            borderRadius: "10px",
            backgroundColor: "rgba(142, 142, 147, 0.35)",
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.3) 0px 0px 15px inset",
            border: "1px solid rgba(128, 128, 128, 0.2)",
        }}>
          <ColabRegisterForm/>
        </div>
        <div style={{
            width: "30%",
            borderRadius: "10px",
            backgroundColor: "rgba(142, 142, 147, 0.35)",
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.3) 0px 0px 15px inset",
            border: "1px solid rgba(128, 128, 128, 0.2)",
        }}>
            <p>私は</p>
        </div>
    </div>
  );
};

export default LoginRegister;