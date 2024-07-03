import { Box, FormControlLabel, Checkbox } from "@mui/material";
import * as React from "react";

type DepartmentData = {
  department: string;
  sub_departments: string[];
};

const departmentData: DepartmentData[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

export default function DepartmentSelector() {
  const [isExpanded, setIsExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<DepartmentData[]>([]);

  const handleExpand = (department: string) => {
    return setIsExpanded((prev) =>
      prev.includes(department) ? prev.filter((dep) => dep != department) : [...prev, department]
    );
  };

  const handleSelectOne = (sub_department: string, i: number) => {
    const isSelected = selected.some(
      (dep) => dep.department === departmentData[i].department && dep.sub_departments.includes(sub_department)
    );

    if (isSelected) {
      const updatedSelected = selected
        .map((dep) => {
          if (dep.department === departmentData[i].department) {
            return {
              ...dep,
              sub_departments: dep.sub_departments.filter((sub) => sub !== sub_department),
            };
          }
          return dep;
        })
        .filter((dep) => dep.sub_departments.length > 0);

      setSelected(updatedSelected);
    } else {
      const updatedSelected = selected.map((dep) => {
        if (dep.department === departmentData[i].department) {
          return {
            ...dep,
            sub_departments: [...dep.sub_departments, sub_department],
          };
        }
        return dep;
      });

      if (!selected.some((dep) => dep.department === departmentData[i].department)) {
        updatedSelected.push({
          department: departmentData[i].department,
          sub_departments: [sub_department],
        });
      }

      setSelected(updatedSelected);
    }
  };

  const handleSelectAll = (i: number) => {
    const isSelected = selected.some((dep) => dep.department === departmentData[i].department);

    setSelected((prev) =>
      isSelected ? prev.filter((dep) => dep.department !== departmentData[i].department) : [...prev, departmentData[i]]
    );
  };

  const isAllSubDepartmentsNotSelected = (department: string, i: number) => {
    return selected.some(
      (dep) => dep.department === department && dep.sub_departments.length < departmentData[i].sub_departments.length
    );
  };

  const isAllSubDepartmentsSelected = (department: string, sub_departments: string[]) => {
    return selected.some(
      (dep) => dep.department === department && dep.sub_departments.length === sub_departments.length
    );
  };

  const isSubDepartmentSelected = (department: string, sub_department: string) => {
    return selected.some((dep) => dep.department === department && dep.sub_departments.includes(sub_department));
  };

  React.useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div>
      {departmentData &&
        departmentData.map((dep, i) => (
          <div key={i}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div onClick={() => handleExpand(dep.department)} id="expand">
                {isExpanded.includes(dep.department) ? "-" : "+"}
              </div>
              <FormControlLabel
                label={dep.department}
                control={
                  <Checkbox
                    checked={isAllSubDepartmentsSelected(dep.department, dep.sub_departments)}
                    indeterminate={isAllSubDepartmentsNotSelected(dep.department, i)}
                    onClick={() => handleSelectAll(i)}
                  />
                }
              />
            </Box>

            {isExpanded.includes(dep.department) && (
              <Box sx={{ display: "flex", flexDirection: "column", ml: 7 }}>
                {dep.sub_departments.map((sub, index) => (
                  <FormControlLabel
                    key={index}
                    label={sub}
                    control={
                      <Checkbox
                        checked={isSubDepartmentSelected(dep.department, sub)}
                        onClick={() => handleSelectOne(sub, i)}
                      />
                    }
                  />
                ))}
              </Box>
            )}
          </div>
        ))}
    </div>
  );
}
