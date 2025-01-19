import ColabRegisterForm from "@/(main)/colab/recruit/register/ColabRegisterForm";


const LoginRegister: React.FC = () => {
  return (
    <div style={{
        display: "flex",
    }}>
        <div style={{
            width: "80%",
        }}>
          <ColabRegisterForm/>
        </div>
        <div style={{
            width: "20%",
        }}>
            <p>私は</p>
        </div>
    </div>
  );
};

export default LoginRegister;