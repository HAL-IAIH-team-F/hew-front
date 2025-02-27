import { ReactNode } from "react";

interface NotificationBaseProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function NotificationBase({ title, description, children }: NotificationBaseProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700 w-full">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-300 mb-4">{description}</p>}
      <div className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">{children}</div>
    </div>
  );
}
