import { currentOrganizationAtom } from "@/lib/atom/dashboard";
import { MedicalRecord } from "@/types/dashboard/medical-record";
import { useAtom } from "jotai";
import { useState } from "react";
import { getCookie } from "../cookie/use-cookie";
import apiClient from "@/lib/utils/api/apiclient";

export default function useRecoveryThisWeek() {
  const [currentOrganization] = useAtom(currentOrganizationAtom);
  const [injuredThisWeek, setInjuredThisWeek] = useState<
    MedicalRecord[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const token = await getCookie("token");
      const response = await apiClient.get(
        `/protected/organization/${currentOrganization?.ID}/medicalrecord/week`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("k", response.data);
      setInjuredThisWeek(response.data.medicalRecords);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
}
