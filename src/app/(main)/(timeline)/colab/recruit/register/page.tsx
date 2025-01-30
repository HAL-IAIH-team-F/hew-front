<<<<<<< HEAD:src/app/(main)/colab/recruit/register/page.tsx
"use client"
import ColabRegisterForm from "@/(main)/colab/recruit/register/ColabRegisterForm";
=======
import ColabRegisterForm from "@/(main)/(timeline)/colab/recruit/register/ColabRegisterForm";
>>>>>>> develop:src/app/(main)/(timeline)/colab/recruit/register/page.tsx


const RegisterRecruit: React.FC = () => {


  return (
    <div style={{
        display: "flex",
        margin: "10px 0px -10px 20px"
    }}>
        <div style={{
            width: "100%",
            margin: "0 15px 0 0",
            padding: "15px",
            borderRadius: "10px",
            backgroundColor: "rgba(142, 142, 147, 0.35)",
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.3) 0px 0px 15px inset",
            border: "1px solid rgba(128, 128, 128, 0.2)",
        }}>
          <ColabRegisterForm/>
        </div>
        {/* <div style={{
            width: "30%",
            borderRadius: "10px",
            backgroundColor: "rgba(142, 142, 147, 0.35)",
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.3) 0px 0px 15px inset",
            border: "1px solid rgba(128, 128, 128, 0.2)",
        }}>
        </div> */}
    </div>
  );
};

export default RegisterRecruit;