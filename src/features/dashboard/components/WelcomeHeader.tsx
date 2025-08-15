interface WelcomeHeaderProps {
  name: string;
}

export const WelcomeHeader = ({ name }: WelcomeHeaderProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {name.split(' ')[0]}! 👋
      </h2>
      <p className="text-gray-600">Ready to continue your learning journey?</p>
    </div>
  )
}
