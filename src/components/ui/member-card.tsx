type MemberCardProps = {
  imgref: string;
  name: string;
  role: string;
  year: string;
  major: string;
};

export default function MemberCard(memberInfo: MemberCardProps) {
  return (
    <div className="text-center text-foreground/90 m-2">
      <div className="p-2 flex">
        <img
          className="m-auto profile-pic rounded-full bg-primary"
          src={memberInfo.imgref}
          alt="Picture representing member"
        />
      </div>
      <p>{memberInfo.name}</p>
      <p className="text-primary">{memberInfo.role}</p>
      <span>{memberInfo.year} </span>
      <p>{memberInfo.major}</p>
    </div>
  );
}
