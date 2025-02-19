import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#0D1B2A] text-white py-10 mt-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Logo & About */}
                <div>
                    <h2 className="text-2xl font-bold text-green-400">ProLearn</h2>
                    <p className="text-gray-300 mt-2 text-sm">
                        Your all-in-one platform for project management and learning.  
                        Unlock your potential with ProLearn today!
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-green-400">Quick Links</h3>
                    <ul className="mt-2 space-y-2">
                        {["Home", "About", "Courses", "Blog", "Contact"].map((link, index) => (
                            <li key={index}>
                                <a href="#" className="text-gray-300 hover:text-green-400 transition duration-300">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-green-400">Follow Us</h3>
                    <div className="flex justify-center md:justify-start space-x-4 mt-3">
                        {[
                            { icon: <FaFacebookF />, link: "#" },
                            { icon: <FaTwitter />, link: "#" },
                            { icon: <FaLinkedinIn />, link: "#" },
                            { icon: <FaInstagram />, link: "#" }
                        ].map((social, index) => (
                            <a 
                                key={index} 
                                href={social.link} 
                                className="p-2 bg-gray-700 rounded-full hover:bg-green-500 transition duration-300"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
                <p>© {new Date().getFullYear()} ProLearn. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
