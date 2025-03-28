// src/components/UserTypeSelector.tsx
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserType } from '@/app/contracts/types/UserType';

interface UserTypeSelectorProps {
  selectedUserType: UserType;
  onUserTypeChange: (userType: UserType) => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ 
  selectedUserType, 
  onUserTypeChange 
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label>Tipo de Usuário</Label>
      <RadioGroup 
        value={selectedUserType} 
        onValueChange={(value) => onUserTypeChange(value as UserType)}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={UserType.MILITARY} id="military" />
          <Label htmlFor="military">Militar</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={UserType.CIVIL_SERVANT} id="civilServant" />
          <Label htmlFor="civilServant">Servidor Civil / Funcionário Terceirizado</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
