import { useLayoutEffect } from "react";
import img1 from "@/assets/hero-1.jpg";
import MemberCard from "@/components/ui/member-card";

// member images
import image_default from "@/assets/BnBLogo.svg";

// update every semester (hopefully)
const academicYear = 2027;

const currentTeam = [
  {
    name: "Akash Keshav",
    img: 'https://profiles.csh.rit.edu/image/ak',
    role: "Director, Spring 2026",
    joinedRIT: 2024,
    major: "Software Engineering",
  },
  {
    name: "Sahil Patel",
    img: 'https://profiles.csh.rit.edu/image/itsahill',
    role: "Director, Fall 2026",
    joinedRIT: 2022,
    major: "Computer Science",
  },
  {
    name: "Isaac Ingram",
    img: 'https://profiles.csh.rit.edu/image/isaac',
    role: "Director, 2025",
    joinedRIT: 2022,
    major: "Computer Science",
  },
  {
    name: "Maelyn VonStettina-May",
    img: 'https://profiles.csh.rit.edu/image/mayz',
    role: "NFC Lead",
    joinedRIT: 2025,
    major: "Cybersecurity",
  },
  {
    name: "Nikolai Strong",
    img: 'https://profiles.csh.rit.edu/image/gravy',
    role: "Hardware Lead",
    joinedRIT: 2025,
    major: "Computer Science",
  },
  {
    name: "Alex Carlisi",
    img: 'https://profiles.csh.rit.edu/image/lilroo',
    role: "Hardware Lead",
    joinedRIT: 2025,
    major: "Computer Engineering",
  },
  {
    name: "Matthew Angell",
    img: 'https://profiles.csh.rit.edu/image/wompwomp',
    role: "Hardware Lead",
    joinedRIT: 2024,
    major: "Computer Engineering",
  },
  {
    name: "Joey Rosso",
    img: 'https://profiles.csh.rit.edu/image/defect',
    role: "Embedded Lead",
    joinedRIT: 2025,
    major: "Software Engineering",
  },
];

const formerTeam = [
  {
    name: "Tyler Severino",
    img: 'https://profiles.csh.rit.edu/image/geese',
    role: "Electrical Lead",
    major: "Electrical Engineering",
  },
];

export default function About() {
  // ensures that we always open at the top of the page
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const getOrdinal = (n: number): string => {
    const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
    const rule = pr.select(n);
    const suffixes: Record<string, string> = {
      one: "st",
      two: "nd",
      few: "rd",
      other: "th",
    };
    return `${n}${suffixes[rule]}`;
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">// about</p>
      <h1 className="mt-3 text-4xl md:text-5xl">About and FAQ</h1>
      <div className="mt-10 rounded-lg bg-secondary p-8 md:p-10">
        <h3 className="text-xl mb-5">About the Project</h3>
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <img src={img1} alt="BnB Cabinet" className="aspect-4/3 rounded my-auto" />
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Bits 'n Bytes is a cutting-edge modern approach to student vending and self service,
              leveraging the power of AI vision and contactless payment to make purchasing food
              quick and seamless.
            </p>
            <p>
              Featuring weight detection and cameras analyzed by an in-house AI vision model, the
              machine is able to provide real time information on what and when is exchanged almost
              instantaneously, allowing customers to take what they need and be charged without
              needing to wait.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="mt-10 rounded-lg bg-secondary p-8 md:p-10">
        <h3 className="text-xl mb-5">About Computer Science House</h3>
        <div className="flex text-foreground/90">
          <div>
            <p>
              Computer Science House (CSH) is a living learning community located on the third floor
              of Douglas-Sprague Perry Hall dormitory at the Rochester Institute of Technology (RIT)
              in Rochester New York. CSH is dedicated to creating a living learning environment
              where anyone is able to innovate and better themselves as a student and as a person.
              Founded in 1976, CSH has around 90 active members every year who are in a diverse
              array of academic programs and over 1,300+ alumni. The facilities on-floor boast any
              resources a student could need for a a project including a server room worth over
              $1,000,000!
            </p>
            <br></br>
            <p>
              CSH is an exciting place to live and learn. There are always fun things to do,
              interesting projects to work on, and members who are eager to share their expertise in
              a wide variety of subjects. Members share a feeling of kinship, belonging, and
              commitment to each other and the organization. The floor has a unique social and
              academic atmosphere: people here like to learn.
            </p>
          </div>
          <div className="m-6 text-center">
            <svg
              width="227"
              height="222"
              viewBox="0 0 227 222"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H176.112V57.0503H138.285V38.4468H37.8269V183.553H138.285V164.95H176.112V222L189.134 222V164.95H189.134V152.548H189.134V127.123H176.112V152.548H138.285V69.4526H176.112V94.8771H189.134V69.4526H189.134V57.0503H189.134V0H226.341V222H0V0ZM125.883 50.8492H50.2291V171.151H125.883V97.9776H98.598V97.9775H75.6537V75.6535H100.458V83.0949H125.883V50.8492ZM75.6538 145.726H100.458V123.402L77.5141 123.402V123.402H50.2292L50.2292 138.285H75.6538V145.726Z"
                fill="black"
              />
            </svg>
            <p className="m-4 font-bold text-lg">Visit us at</p>
            <a href="https://csh.rit.edu/" className="m-4 font-bold text-xl text-purple-800">
              csh.rit.edu
            </a>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="mt-10 rounded-lg bg-secondary p-8 md:p-10">
        <h3 className="text-xl mb-5">Team Credits</h3>
        <div className="grid grid-cols-4">
          {currentTeam &&
            currentTeam.map((member) => {
              return (
                <MemberCard
                  imgref={member.img}
                  name={member.name}
                  role={member.role}
                  year={getOrdinal(academicYear - member.joinedRIT) + " Year"}
                  major={member.major}
                />
              );
            })}
        </div>
        <div className="m-8">
          <h6 className="text-lg">Additional Thanks:</h6>
          <ul className="list-disc list-inside">
            <li>RIT Dining</li>
            <li>Computer Science House Executive Board</li>
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-14">
        <h2 className="text-2xl">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-6">
          {[
            {
              q: "What types of payment are accepted?",
              a: "We currently don't charge real money. We accept RIT Student IDs and our custom BnB Demo Tokens.",
            },
            {
              q: "How does the AI actually help?",
              a: "Our AI is trained in house as a vision model, to help detect what each user is actually purchasing from the cabinet.",
            },
            {
              q: "How long has the project been in development?",
              a: "We have been working on the project for over 3 years, first presenting at Imagine RIT 2023.",
            },
          ].map((item) => (
            <div key={item.q} className="border-l-4 border-accent pl-4">
              <h3 className="text-base font-bold text-accent">{item.q}</h3>
              <p className="mt-1 text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
