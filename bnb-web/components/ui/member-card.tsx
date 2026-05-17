
type MemberCardProps = {
  imgref: string;
  name: string;
  role: string;
  year: string;
  major: string;
};

export default function MemberCard(memberInfo: MemberCardProps){
    return (
        <div className="text-center text-black m-2">
            <img className="profile-pic" src={memberInfo.imgref} alt="Picture representing member"></img>
            <p>{memberInfo.name}</p>
            <p className="text-purple-600">{memberInfo.role}</p>
            <span>{memberInfo.year} </span>
            <p>{memberInfo.major}</p>
        </div>
    );
}