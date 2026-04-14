import MemberCard from "@/components/ui/member-card";


export default function AboutPage() {
    return (
        <section className="mt-8 ml-[15%] mr-[15%] mb-16">

            <h1 className="text-center text-4xl m-8"> About </h1>

            <section className="aboutPageSection mb-4">
                <h3>About the Project Bits &quot;n Bytes</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur. Volutpat et viverra augue quisque ornare a egestas diam eleifend. Amet vel molestie sit orci elementum turpis aliquet. Odio tempus et pellentesque a lacus. Mattis a amet a pretium.
                    Aliquet cras dolor tellus est ac aenean eget amet elementum. Cursus et ut pellentesque nibh. Dignissim sed in vulputate leo aliquet malesuada. Consequat quam mattis ullamcorper tristique quis lobortis dui turpis blandit. Dictum facilisis in felis commodo egestas nulla. Mauris turpis lorem id blandit sagittis eu sed. Ipsum interdum fermentum quis sed eget lectus ultrices donec.
                </p>
            </section>

            <section className="aboutPageSection">
                <h3>
                    Frequently Asked Questions
                </h3>
                <ul>
                    <li>
                        <h5>What types of payment are accepted?</h5>
                        <p>
                            Currently we are accepting CSH drink credits and RIT dinning dollars.
                        </p>
                    </li>
                    <li>
                        <h5>Q2</h5>
                        <p>
                            Lorem ipsum dolor sit amet consectetur. Volutpat et viverra augue quisque ornare a egestas diam eleifend. Amet vel molestie sit orci elementum turpis aliquet.                        
                        </p>
                    </li>
                    <li>
                        <h5>Q3</h5>
                        <p>
                            Lorem ipsum dolor sit amet consectetur. Volutpat et viverra augue quisque ornare a egestas diam eleifend. Amet vel molestie sit orci elementum turpis aliquet.
                        </p>
                    </li>
                    <li>
                        <h5>Qn...</h5>
                        <p>
                            Lorem ipsum dolor sit amet consectetur. Volutpat et viverra augue quisque ornare a egestas diam eleifend. Amet vel molestie sit orci elementum turpis aliquet.
                        </p>
                    </li>
                </ul>
            </section>

            <section className="aboutPageSection flex">
                <div>
                    <h3>
                        About Computer Science House
                    </h3>
                    <p>
                        Computer Science House (CSH) is a living learning community located on the third floor of Douglas-Sprague Perry Hall dormitory at the Rochester Institute of Technology (RIT) in Rochester New York. CSH is dedicated to creating a living learning environment where anyone is able to innovate and better themselves as a student and as a person. Founded in 1976, CSH has around 90 active members every year who are in a diverse array of academic programs and over 1,300+ alumni. The facilities on-floor boast any resources a student could need for a a project including a server room worth over $1,000,000! 
                    </p>
                    <br></br>
                    <p>
                        CSH is an exciting place to live and learn. There are always fun things to do, interesting projects to work on, and members who are eager to share their expertise in a wide variety of subjects. Members share a feeling of kinship, belonging, and commitment to each other and the organization. The floor has a unique social and academic atmosphere: people here like to learn.
                    </p>
                </div>
                <div className="m-6 text-center">
                    <svg width="227" height="222" viewBox="0 0 227 222" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H176.112V57.0503H138.285V38.4468H37.8269V183.553H138.285V164.95H176.112V222L189.134 222V164.95H189.134V152.548H189.134V127.123H176.112V152.548H138.285V69.4526H176.112V94.8771H189.134V69.4526H189.134V57.0503H189.134V0H226.341V222H0V0ZM125.883 50.8492H50.2291V171.151H125.883V97.9776H98.598V97.9775H75.6537V75.6535H100.458V83.0949H125.883V50.8492ZM75.6538 145.726H100.458V123.402L77.5141 123.402V123.402H50.2292L50.2292 138.285H75.6538V145.726Z" fill="black"/>
                    </svg>
                    <p className="m-4 font-bold text-lg">Visit us at</p>
                    <a href="https://csh.rit.edu/" className="m-4 font-bold text-xl text-purple-800">csh.rit.edu</a>
                </div>
            </section>

            <section className="aboutPageSection text-black">
                <h3>
                    Team Credits
                </h3>
                <div className="grid grid-cols-4">
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                    <MemberCard imgref="/images/AnimeBitsNBytes.png" name="Bartholomew Bob the 5th" role="Emotional Support" year="5th year" major="Computer Science"></MemberCard>
                </div>
                <div className="m-8">
                    <h6 className="text-lg">Additional Thanks:</h6>
                    <ul className="list-disc list-inside">
                        <li>Rit Dining</li>
                        <li>Computer Science House Executive Board</li>
                        <li>etc...</li>
                    </ul>
                </div>
            </section>
        </section>
    );
}