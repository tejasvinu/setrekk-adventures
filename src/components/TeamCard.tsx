import Image from 'next/image';

const TeamCard = () => {
  return (
    <section className="bg-white">
      <div className="container px-6 py-10 mx-auto">
        <div className="xl:flex xl:items-center xl:-mx-4">
          <div className="xl:w-1/2 xl:mx-4">
            <h2 className="text-3xl font-bold text-slate-800 lg:text-4xl">Our Team</h2>
            <p className="max-w-2xl mt-4 text-slate-700">
              We're a bunch of adventure enthusiasts dedicated to bringing you the best weekend escapades and exploration experiences. Whether it's hiking, camping, or discovering hidden gems, we're here to make sure every adventure is packed with excitement and good vibes. Our crew works behind the scenes to craft unforgettable trips and share our passion for the great outdoors with you. So, come join us and let's make some epic memories together!
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-0 xl:w-1/2 xl:mx-4">
            <div>
              <Image className="object-cover rounded-xl" src="/IMG_7012-01.jpeg" alt="Tejas Vinay P" width={500} height={256}/>
              <h3 className="mt-4 text-2xl font-semibold text-slate-800">Tejas Vinay P</h3>
              <p className="mt-2 text-slate-600">Founder</p>
            </div>
            <div>
              <Image className="object-cover rounded-xl" src="/IMG_2770.jpg" alt="Akash Raj" width={500} height={256}/>
              <h3 className="mt-4 text-2xl font-semibold text-slate-800">Akash Raj</h3>
              <p className="mt-2 text-slate-600">Trek Lead</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCard;
