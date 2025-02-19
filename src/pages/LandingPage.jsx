import Button from "../components/ui/Button";
import { motion } from "framer-motion";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center h-screen px-6">
                <motion.h1 
                    className="text-5xl md:text-6xl font-extrabold mb-6 text-green-400"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Empower Your Learning & Productivity
                </motion.h1>
                <motion.p 
                    className="text-lg md:text-xl text-gray-300 max-w-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Welcome to <span className="text-green-300 font-medium">ProLearn</span> – your all-in-one platform to 
                    <span className="text-green-300 font-medium"> learn, manage projects, and collaborate</span> effortlessly.
                </motion.p>
                
                <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300">
                        Get Started
                    </Button>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-gray-800 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-green-300">Why Choose ProLearn?</h2>
                <p className="text-gray-300 max-w-2xl mx-auto mt-4">
                    We bring together the best tools to help you <span className="text-green-300 font-semibold">grow, manage, and collaborate</span> like never before.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {[
                        { 
                            title: "Comprehensive Courses", 
                            desc: "Learn from industry experts with our curated courses covering various domains." 
                        },
                        { 
                            title: "Smart Project Management", 
                            desc: "Keep your projects organized, set deadlines, and track progress seamlessly." 
                        },
                        { 
                            title: "Collaboration Made Easy", 
                            desc: "Communicate with your team, share resources, and work together effortlessly." 
                        },
                        { 
                            title: "Progress Tracking", 
                            desc: "Monitor your learning and project milestones with our intuitive dashboard." 
                        },
                        { 
                            title: "Customizable Workflows", 
                            desc: "Adapt your project workflow to fit your unique needs and goals." 
                        },
                        { 
                            title: "Secure & Reliable", 
                            desc: "We prioritize security and data protection so you can focus on learning and building." 
                        }
                    ].map((feature, index) => (
                        <motion.div 
                            key={index}
                            className="p-6 bg-gray-700 rounded-xl shadow-lg transition-transform transform hover:scale-105"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index, duration: 0.6 }}
                        >
                            <h3 className="text-xl font-medium text-green-400">{feature.title}</h3>
                            <p className="text-gray-300 mt-2">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Call to Action - Ready to Get Started */}
            <section className="py-20 px-6 bg-gradient-to-r from-green-500 to-green-700 text-center text-white">
                <motion.h2 
                    className="text-3xl md:text-4xl font-extrabold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Ready to Unlock Your Potential?
                </motion.h2>
                <motion.p 
                    className="text-lg md:text-xl max-w-2xl mx-auto mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Join thousands of learners and professionals using <span className="font-semibold">ProLearn</span> to advance their skills, manage projects, and achieve their goals.
                </motion.p>
                
                <motion.div 
                    className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300">
                        Join Now
                    </Button>
                    <Button className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300">
                        Learn More
                    </Button>
                </motion.div>
            </section>
        </div>
    );
};

export default LandingPage;
