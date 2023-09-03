import { SignUp } from "@clerk/nextjs";

const companions = [
  { "name": "Life Coaches" },
  { "name": "Emotional Support" },
  { "name": "Fitness and Wellness" },
  { "name": "Educational Advisors" },
  { "name": "Career Guidance" },
  { "name": "Relationship Coaches" },
  { "name": "Travel Companions" },
  { "name": "Entertainment and Games" },
  { "name": "Spiritual Guides" },
  { "name": "Friends and Partners" },
  { "name": "Elderly Companions" }
];

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-4xl font-bold text-white mb-4">SoulSynth.AI</h1>
      <div className="text-lg mb-8 text-white">
        Sign up and explore a world of companions:
      </div>
      <ul className="flex flex-wrap justify-center space-x-2 space-y-2 mb-8 text-white">
        {companions.map((companion, index) => (
          <li key={index} className={`text-lg flex items-center ${index === 0 ? 'mb-[-0.2rem]' : ''}`}>
            <span className="self-center mb-2">{companion.name}</span>
            <svg className="mx-2 self-center h-4" width="10" height="10">
              <polygon points="5,0 10,10 0,10" fill={index === companions.length - 1 ? 'transparent' : 'white'}/>
            </svg>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center space-x-4 w-full px-4">
        <img src="/spiritual_guide.png" alt="Left Side" className="w-1/4 object-cover rounded-lg ml-4"/>
        <SignUp />
        <img src="/life_coach.png" alt="Right Side" className="w-1/4 object-cover rounded-lg mr-4"/>
      </div>
    </div>
  );
}
