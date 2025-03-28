"use client";

import * as React from "react";
import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';

import { validatePassword } from "../utils/passwordValidation";
import { IUserRegistrationData } from "../contracts/interfaces/IUserRegistrationData";
import { IPatent } from "../contracts/interfaces/IPatent";
import { UserType } from "../contracts/types/UserType";
import { validateNip } from "../utils/nipValidations";
import { UserTypeSelector } from "./utils/UserTypeSelector";
import { userTypeValidation } from "../utils/userTypeValidation";
import { validateEmail } from "../utils/emailValidations";
import { 
  validatePhoneNumber, 
  formatPhoneNumber, 
  getCleanPhoneNumber 
} from '../utils/phoneValidation';

export default function RegisterForm() {
  const [userData, setUserData] = useState<IUserRegistrationData>({
    firstName: '',
    lastName: '',
    warName: '',
    nip: '',
    userType: UserType.MILITARY,
    emailMb: '',
    contactNumber: '',
    patent: null,
    password: ''
  });

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [patents, setPatents] = useState<IPatent[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [nipValidationErrors, setNipValidationErrors] = useState<string[]>([]);
  const [emailValidationErrors, setEmailValidationErrors] = useState<string[]>([]);
  const [phoneValidationErrors, setPhoneValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchPatents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/patent`, {
          cache: "no-store",
        });
        const data = await response.json();
        setPatents(data);
        if (data.length > 0) {
          setUserData(prev => ({ ...prev, patent: data[0].idPatent }));
        }
      } catch (error) {
        console.error("Erro ao buscar informações:", error);
      }
    };

    fetchPatents();
  }, []);

  useEffect(() => {
    const nipErrors = validateNip(userData.nip, userData.userType);
    setNipValidationErrors(nipErrors);
  }, [userData.nip, userData.userType]);

  useEffect(() => {
    const emailErrors = validateEmail(userData.emailMb);
    setEmailValidationErrors(emailErrors);
  }, [userData.emailMb]);

  
  useEffect(() => {
    const phoneErrors = validatePhoneNumber(userData.contactNumber);
    setPhoneValidationErrors(phoneErrors);
  }, [userData.contactNumber]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const requiredFieldErrors = validateRequiredFields(userData);
    if (requiredFieldErrors.length > 0) {
      setErrorMessage(requiredFieldErrors.join(", "));
      return;
    }

    // Validate password
    const passwordErrors = validatePassword(userData.password);
    if (passwordErrors.length > 0) {
      setErrorMessage(passwordErrors.join(". "));
      return;
    }

    // Check password match
    if (userData.password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    // Check NIP validation
    if (nipValidationErrors.length > 0) {
      setErrorMessage(nipValidationErrors.join(", "));
      return;
    }

    // Check email validation
    if (emailValidationErrors.length > 0) {
    setErrorMessage(emailValidationErrors.join(", "));
    return;
    }

    // Add phone validation
    if (phoneValidationErrors.length > 0) {
      setErrorMessage(phoneValidationErrors.join(", "));
      return;
    }

    try {
      const response = await submitUserRegistration(userData);
      
      if (response.ok) {
        setSuccessMessage('Usuário cadastrado com sucesso!');
        window.alert('Novo Usuário cadastrado com sucesso!');
        resetForm();
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Erro no cadastro');
      }
    } catch (err) {
      console.error('Erro de rede durante o upload:', err);
      setErrorMessage('Erro de conexão');
    }
  };

  const resetForm = () => {
    setUserData({
      firstName: '',
      lastName: '',
      warName: '',
      nip: '',
      userType: UserType.MILITARY,
      emailMb: '',
      contactNumber: '',
      patent: patents[0]?.idPatent || null,
      password: ''
    });
    setConfirmPassword('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const submitUserRegistration = async (data: IUserRegistrationData) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/users`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nip: data.nip,
        idPatent: data.patent,
        warName: data.warName,
        firstName: data.firstName,
        lastName: data.lastName,
        role: "user",
        status: "active",
        permission: "user",
        password: data.password,
        emailPersonal: data.emailMb,
        emailMb: data.emailMb,
        contactNumber: data.contactNumber
      }),
    });
  };

  // Handler for phone number input
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digit characters
    const inputVal = e.target.value.replace(/\D/g, '');
    
    // Update state with cleaned number
    setUserData(prev => ({ 
      ...prev, 
      contactNumber: getCleanPhoneNumber(inputVal) 
    }));
  };

  const validateRequiredFields = (data: IUserRegistrationData): string[] => {
    const errors: string[] = [];
    
    const requiredFields: (keyof IUserRegistrationData)[] = [
      'firstName', 'lastName', 'warName', 'nip', 
      'emailMb', 'contactNumber', 'patent', 'password'
    ];

    requiredFields.forEach(field => {
      if (!data[field]) {
        errors.push(`O campo ${field} é obrigatório`);
      }
    });

    return errors;
  };

  return (
    <Card 
      className="
      w-[800px]       {/* Fixed width */}
      h-[650px]       {/* Fixed height */}
      max-w-full      {/* Responsive max-width */}
      overflow-y-auto {/* Scroll if content exceeds height */}
      text-blue-900 
      p-2            {/* Consistent padding */}
      mx-auto        {/* Center the card */}
      flex 
      flex-col
      "
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Cadastro de Usuário</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <UserTypeSelector 
              selectedUserType={userData.userType}
              onUserTypeChange={(userType) => setUserData(prev => ({ ...prev, userType }))}
            />

              {/* NOME */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input
                  alt="formulario de cadastro de usuário: campo para inserir nome do usuário"
                  id="create_user_form_firstname"
                  placeholder="Insira o nome do usuário"
                  value={userData.firstName}
                  onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                  required
                  autoFocus
                />
              </div>

              {/* NOME DE GUERRA */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome de guerra</Label>
                <Input
                  alt="formulario de cadastro de usuário: campo para inserir nome de guerra do usuário"
                  id="create_user_form_warname"
                  placeholder="Insira o nome de guerra"
                  value={userData.warName}
                  onChange={(e) => setUserData(prev => ({ ...prev, warName: e.target.value }))}
                  required
                />
              </div>

              {/* SOBRENOME */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="surname">Sobrenome</Label>
                <Input
                  alt="formulario de cadastro de usuário: campo para inserir sobrenome do usuário"
                  id="create_user_form_lastname"
                  placeholder="Insira o sobrenome do usuário"
                  value={userData.lastName}
                  onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                  required
                />
              </div>

              {/* NIP */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nip">
                  {userData.userType === UserType.MILITARY ? 'NIP' : 'CPF'}
                </Label>
                <Input
                  alt="formulario de cadastro de usuário: campo para inserir NIP do usuário"
                  type="text"
                  id="create_user_form_nip"
                  placeholder={ userTypeValidation(userData.userType)?.placeholder }
                  value={userData.nip}
                  onChange={(e) => setUserData(prev => ({ ...prev, nip: e.target.value }))}
                  maxLength={ userTypeValidation(userData.userType)?.length }
                  minLength={ userTypeValidation(userData.userType)?.length }
                  required
                />
                {nipValidationErrors.length > 0 && (
                  <div className="text-red-600 text-sm">
                    {nipValidationErrors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* EMAIL MB */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  alt="formulario de cadastro de usuário: campo para inserir email do usuário"
                  type="email"
                  id="create_user_form_emailMb"
                  placeholder="Insira um Email válido"
                  value={userData.emailMb}
                  onChange={(e) => setUserData(prev => ({ ...prev, emailMb: e.target.value }))}
                  className={
                    emailValidationErrors.length > 0 
                      ? 'border-red-500 focus:ring-red-500' 
                      : ''
                  }
                  required
                />
                {emailValidationErrors.length > 0 && (
                  <div className="text-red-600 text-sm">
                    {emailValidationErrors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* NUMERO CONTATO */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contactNumber">Telefone</Label>
                <Input
                  alt="formulario de cadastro de usuário: campo para inserir Telefone do usuário"
                  type="tel"
                  id="create_user_form_telefone"
                  placeholder="(DDD) 9988-7766"
                  value={formatPhoneNumber(userData.contactNumber)}
                  onChange={handlePhoneNumberChange}
                  maxLength={15} // (061) 9988-7766
                  className={
                    phoneValidationErrors.length > 0 
                      ? 'border-red-500 focus:ring-red-500' 
                      : ''
                  }
                  required
                />
                {phoneValidationErrors.length > 0 && (
                  <div className="text-red-600 text-sm">
                    {phoneValidationErrors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* PATENTE */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="patent">Selecione Posto/Grad</Label>
                <select 
                  id="patent" 
                  className="border p-2 rounded w-full"
                  value={userData.patent || ''}
                  onChange={(e) => {setUserData(prev => ({ ...prev, patent: Number(e.target.value) }))}}
                >
                  {patents.length > 0 ? (
                    patents.map((patent: IPatent) => (
                      <option key={patent.idPatent} value={patent.idPatent}>
                        {patent.patent}
                      </option>
                    ))
                  ) : (
                    <option>Carregando...</option>
                  )}
                </select>
              </div>

              {/* SENHA */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    alt="formulario de cadastro de usuário: campo para inserir senha"
                    id="create_user_form_password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Insira a senha"
                    value={userData.password}
                    onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* CONFIRMAR SENHA */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm-password">Confirme a Senha</Label>
                <div className="relative">
                  <Input
                    alt="formulario de cadastro de usuário: campo para confirmar senha"
                    id="create_user_form_confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme a senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

            {errorMessage && (
              <div className="col-span-2 text-red-600 text-sm mt-2">{
                  errorMessage
                }
              </div>
            )}
            {successMessage && (
              <div className="col-span-2 text-green-600 text-sm mt-2">{successMessage}</div>
            )}
          </div>

          <CardFooter className="justify-end">
            <Button
              type="submit"
              className="bg-blue-900 text-white hover:bg-blue-800"
            >
              Fazer Cadastro
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
