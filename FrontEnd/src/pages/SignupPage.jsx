import { motion } from "framer-motion";


const SignupPage = () => {
    const handleSignup = (e) => {
        e.preventDefault();
    }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-sky-500 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSignup}>

        </form>
      </div>
    </motion.div>
  );
};

export default SignupPage;
