import SERVER from "./url";
import axios from "axios";
import { useQuery, useQueries } from "@tanstack/react-query";

// 회원가입
export const addUser = async (userInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/join`, userInfo);
    if (response.status === 200) {
      alert("회원가입 되었습니다");
    }
  } catch (error) {
    if (error.response.status === 409) {
      alert("이미 있는 id입니다");
    }
    throw new Error("sign up user error");
  }
};

// 로그인
export const authUser = async (userInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/login`, userInfo);
    if (response.status === 200) {
      sessionStorage.setItem("accessToken", response.data.token);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("departmentName", response.data.departmentName);
      localStorage.setItem("isAdmin", response.data.isAdmin);
      alert("로그인 되었습니다");
    }
  } catch (error) {
    if (error.response.status === 404) {
      alert("존재하지 않는 id입니다");
    }
    if (error.response.status === 403) {
      alert("비밀번호가 일치하지 않습니다.");
    }
    throw new Error("sign in user error");
  }
};

//////////////////////Folder/////////////////////////
// folder 생성
export const addFolder = async (folderInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/folder`, folderInfo);
    if (response.status === 200) {
      alert("폴더가 생성되었습니다.");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Add folder error");
  }
};

// folder 삭제
export const deleteFolder = async (folderName, folderInfo) => {
  try {
    const response = await axios.post(
      `${SERVER}/api/v1/folder/${folderName}`,
      folderInfo
    );
    if (response.status === 200) {
      alert("폴더가 삭제되었습니다.");
    }
  } catch (error) {
    console.log(error);
    throw new Error("delete folder error");
  }
};

//////////////////////Workspace/////////////////////////
// workspace 생성
export const addWorkspace = async (workspaceInfo) => {
  try {
    const response = await axios.post(
      `${SERVER}/api/v1/workspace`,
      workspaceInfo
    );
    if (response.status === 200) {
      alert(response.data);
    }
  } catch (error) {
    console.log(error);
    throw new Error("create workspace error");
  }
};

// workspace 사용량 조회
export const useWorkspaceUsage = () => {
  return useQuery(["usage"], () => getWorkspaceUsage(), {
    staleTime: 5000,
    cacheTime: Infinity,
  });
};

export const getWorkspaceUsage = async () => {
  try {
    const { data } = await axios.get(`${SERVER}/api/v1/workspace/storage`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });
    return data;
  } catch (err) {
    throw new Error("fetch worksapce usage error");
  }
};

/////////////////////Department//////////////////////////
// 부서 목록 조회
export const getAllDepartments = async () => {
  try {
    const { data } = await axios.get(`${SERVER}/api/v1/department`, {});
    return data;
  } catch (err) {
    throw new Error("fetch department error");
  }
};

export const useGetAllDepartments = () => {
  return useQuery(["departmentList"], () => getAllDepartments(), {
    staleTime: 5000,
    cacheTime: Infinity,
  });
};

// 부서 추가
export const addDepartment = async (departmentInfo) => {
  try {
    const response = await axios.post(
      `${SERVER}/api/v1/department`,
      departmentInfo
    );
    if (response.status === 200) {
      alert("부서가 등록되었습니다");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Add department error");
  }
};

//////////////////////Organization/////////////////////////
// organization 전체 목록 조회
export const getAdminOrganizations = async () => {
  try {
    const { data } = await axios.get(`${SERVER}/api/v1/organization`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });
    return data;
  } catch (err) {
    throw new Error("fetch organization error");
  }
};

export const useGetAdminOrganization = () => {
  return useQuery(["adminOrganizationList"], () => getAdminOrganizations(), {
    staleTime: 5000,
    cacheTime: Infinity,
  });
};

// organization 생성
export const addOrganization = async (organizationInfo) => {
  try {
    const response = await axios.post(
      `${SERVER}/api/v1/organization`,
      organizationInfo,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );
    if (response.status === 200) {
      alert("organization이 등록되었습니다");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Add organization error");
  }
};

// organization 삭제
export const deleteOrganization = async (organizationName) => {
  try {
    const response = await axios.delete(
      `${SERVER}/api/v1/organization/${organizationName}`
    );
    if (response.status === 200) {
      alert("organization이 삭제되었습니다");
    }
  } catch (error) {
    if (error.response.data.status === 404) {
      alert("해당 그룹이 존재하지 않습니다.");
    }
    console.log(error);
    throw new Error("delete organization error");
  }
};

// organization에 사용자 추가
export const addUserInOrganization = async (organizationName, userInfo) => {
  try {
    const response = await axios.post(
      `${SERVER}/api/v1/organization/${organizationName}`,
      userInfo
    );
    if (response.status === 200) {
      alert("organization에 사용자가 추가되었습니다");
    }
  } catch (error) {
    if (error.response.data.status === 409) {
      alert("해당 사용자는 이미 그룹에 있습니다.");
    }
    if (error.response.data.status === 404) {
      alert("해당 사용자가 존재하지 않습니다.");
    }
    throw new Error("Add user in organization error");
  }
};

// organization에서 사용자 삭제
export const deleteOrganizationMember = async (organizationName, username) => {
  try {
    const response = await axios.delete(
      `${SERVER}/api/v1/organization/${organizationName}/${username}`
    );
    if (response.status === 200) {
      alert("해당 사용자가 그룹에서 제외되었습니다");
    }
  } catch (error) {
    console.log(error);
    throw new Error("delete organization error");
  }
};

// 사용자별 organization 목록 조회
export const useGetAllOrganizations = (username) => {
  return useQuery(
    ["organizationList", username],
    () => getAllOrganizations(username),
    {
      staleTime: 5000,
    }
  );
};

export const getAllOrganizations = async (username) => {
  try {
    const { data } = await axios.get(
      `${SERVER}/api/v1/organization/${username}/all`,
      {}
    );
    return data;
  } catch (err) {
    throw new Error("fetch all organization error");
  }
};

// 그룹의 사용자 목록 조회
export const getOrganizationMemberList = async (organizationName) => {
  try {
    const { data } = await axios.get(
      `${SERVER}/api/v1/organization/${organizationName}`,
      {}
    );
    return data;
  } catch (error) {
    if (error.response.data.status === 404) {
      alert("해당 그룹이 존재하지 않습니다.");
    }
    throw new Error("fetch all organization error");
  }
};

export const useGetOrganizationMemberList = (organizationName) => {
  return useQuery(
    ["memberList", organizationName],
    () => getOrganizationMemberList(organizationName),
    {
      initialData: [],
      staleTime: 5000,
    }
  );
};

//////////////////////공유 파일/////////////////////////
// 그룹 내 공유 파일 목록 조회
// organizationNames 가 array
export const useGetAllSharedFiles = (organizationNames) => {
  return useQueries({
    queries: organizationNames.map((organizationName) => {
      return {
        queryKey: ["sharedFile", organizationName],
        queryFn: () => getAllSharedFiles(organizationName),
        enabled: organizationNames.length > 0,
      };
    }),
  });
};

export const getAllSharedFiles = async (organizationName) => {
  try {
    const { data } = await axios.get(
      `${SERVER}/api/v1/${organizationName}/sharedFile`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );
    return data;
  } catch (err) {
    throw new Error("fetch all shared file error");
  }
};

// 그룹 내 공유 파일 추가
export const addSharedFileInOrganization = async (
  organizationName,
  sharedFileInfo
) => {
  try {
    const response = await axios.post(
      `${SERVER}/api/v1/${organizationName}/sharedFile`,
      sharedFileInfo
    );
    if (response.status === 200) {
      alert("공유파일이 등록되었습니다");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Add shared file in organization error");
  }
};

// 공유파일 내용 조회
export const getSharedFileContent = async (organizationName, fileName) => {
  try {
    const { data } = await axios.get(
      `${SERVER}/api/v1/${organizationName}/sharedFile/${fileName}`,
      {}
    );
    return data;
  } catch (err) {
    throw new Error("fetch shared file content error");
  }
};

// 그룹내 파일 공유 중지
export const deleteSharedFile = async (organizationName, fileName) => {
  try {
    const response = await axios.delete(
      `${SERVER}/api/v1/${organizationName}/sharedFile/${fileName}`
    );
    if (response.status === 200) {
      alert("파일 공유가 중지되었습니다");
    }
  } catch (error) {
    console.log(error);
    throw new Error("delete shared file error");
  }
};

// 파일로 실행
export const runFile = async (contents) => {
  try {
    const response = await axios.post(`${SERVER}/api/run/file`, contents);
    if (response.status === 200) {
      console.log("실행 완료");
      console.log(response);
      return response.data;
    }
  } catch (error) {
    throw new Error("execute error");
  }
};

// 코드 한줄 실행
export const runLine = async (command) => {
  try {
    const response = await axios.post(`${SERVER}/api/run/line`, command);
    if (response.status === 200) {
      console.log(response);
      return response.data;
    }
  } catch (error) {
    throw new Error("execute error");
  }
};

// 내 파일 내용 조회
export const useGetFile = (filePathInfo) => {
  return useQuery(["file"], () => getFile(filePathInfo), {
    staleTime: 5000,
    cacheTime: Infinity,
    enabled: filePathInfo.filePath.length > 0,
  });
};

export const getFile = async (filePathInfo) => {
  try {
    const response = await axios.post(
      `${SERVER}/api/v1/files/info`,
      filePathInfo
    );
    return response.data;
  } catch (err) {
    if (err.response.data.status === 400) {
      console.log(err);
    }
    throw new Error("read file error");
  }
};

// 내 파일 전체 조회
export const useGetFiles = () => {
  return useQuery(["files"], () => getAllFile(), {
    staleTime: 5000,
    cacheTime: Infinity,
  });
};

export const getAllFile = async () => {
  try {
    const response = await axios.get(`${SERVER}/api/v1/files/all`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });
    return response.data;
  } catch (err) {
    throw new Error("read all file error");
  }
};

// 파일 저장
export const addFile = async (fileInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/files`, fileInfo);
    if (response.status === 200) {
      alert("파일이 저장되었습니다.");
    }
  } catch (error) {
    throw new Error("sign up user error");
  }
};

// resource monitoring
export const useGetResources = () => {
  return useQuery(["resources"], () => getAllResource(), {
    staleTime: 5000,
    cacheTime: Infinity,
    refetchInterval: 1000,
  });
};

export const getAllResource = async () => {
  try {
    const response = await axios.get(
      `${SERVER}/api/v1/monitoring/resources`,
      {}
    );
    return response;
  } catch (err) {
    throw new Error("read all file error");
  }
};
