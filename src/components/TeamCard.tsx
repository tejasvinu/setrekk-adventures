import Image from 'next/image';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: "Tejas Vinay P",
    role: "Founder",
    imageSrc: "/IMG_7012-01.jpeg",
    alt: "Tejas Vinay P"
  },
  {
    name: "Akash Raj",
    role: "Trek Lead",
    imageSrc: "/IMG_2770.jpg",
    alt: "Akash Raj"
  }
];

const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.1 } 
  }
};

const leftColumnContentVariants = {
  hidden: {}, // Parent for staggering
  visible: { transition: { staggerChildren: 0.2 } }
};

const textItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const teamGridVariants = {
  hidden: {}, // Parent for staggering
  visible: { transition: { staggerChildren: 0.25 } }
};

const teamMemberCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const teamMemberInnerContentVariants = {
  hidden: {}, // Parent for staggering
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } // Delay after card appears
};

const teamImageVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

const teamNameRoleVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};


const TeamCard = () => {
  return (
    <motion.section 
      className="bg-white"
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container px-6 py-10 mx-auto">
        <div className="xl:flex xl:items-center xl:-mx-4">
          <motion.div 
            className="xl:w-1/2 xl:mx-4"
            variants={leftColumnContentVariants} // This will stagger its children (h2, p)
          >
            <motion.h2 
              className="text-3xl font-bold text-slate-800 lg:text-4xl font-display" // Added font-display
              variants={textItemVariants}
            >
              Our Team
            </motion.h2>
            <motion.p 
              className="max-w-2xl mt-4 text-slate-700"
              variants={textItemVariants}
            >
              We're a bunch of adventure enthusiasts dedicated to bringing you the best weekend escapades and exploration experiences. Whether it's hiking, camping, or discovering hidden gems, we're here to make sure every adventure is packed with excitement and good vibes. Our crew works behind the scenes to craft unforgettable trips and share our passion for the great outdoors with you. So, come join us and let's make some epic memories together!
            </motion.p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 gap-8 mt-8 xl:mt-0 xl:w-1/2 xl:mx-4"
            variants={teamGridVariants} // This will stagger team member cards
          >
            {teamMembers.map((member) => (
              <motion.div 
                key={member.name}
                variants={teamMemberCardVariants} // Each card animates in
                className="overflow-hidden rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-shadow duration-300"
              >
                <motion.div variants={teamMemberInnerContentVariants}> {/* Stagger image, name, role */}
                  <motion.div variants={teamImageVariants} className="relative w-full h-64"> {/* Added relative and fixed height for Image fill */}
                    <Image 
                      className="object-cover" 
                      src={member.imageSrc} 
                      alt={member.alt} 
                      layout="fill" // Changed to fill for fixed container
                    />
                  </motion.div>
                  <div className="p-6">
                    <motion.h3 
                      className="mt-1 text-2xl font-semibold text-slate-800 font-display" // Added font-display
                      variants={teamNameRoleVariants}
                    >
                      {member.name}
                    </motion.h3>
                    <motion.p 
                      className="mt-1 text-slate-600"
                      variants={teamNameRoleVariants}
                    >
                      {member.role}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default TeamCard;
