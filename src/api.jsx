import SERVER from "./url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      alert("로그인 되었습니다");
    }
  } catch (error) {
    console.log(error);
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
    const response = await axios.post(`${SERVER}/api/v1/folder/${folderName}`, folderInfo);
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
    const response = await axios.post(`${SERVER}/api/v1/workspace`, workspaceInfo);
    if (response.status === 200) {
      alert("workspace가 생성되었습니다.");
    }
  } catch (error) {
    console.log(error);
    throw new Error("create workspace error");
  }
};

// workspace 사용량 조회
export const getWorkspaceUsage = async () => {
  try {
    const { data } = await axios.get(`${SERVER}/api/v1/workspace/storage`, {});
    return data;
  } catch (err) {
    throw new Error('fetch worksapce usage error');
  }
};


/////////////////////Department//////////////////////////
// 부서 목록 조회
export const getAllDepartments = async () => {
  try {
    const { data } = await axios.get(`${SERVER}/api/v1/department`, {});
    return data;
  } catch (err) {
    throw new Error('fetch department error');
  }
};

// 부서 추가
export const addDepartment = async (departmentInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/department`, departmentInfo);
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
export const getAllOrganizations = async () => {
  try {
    const { data } = await axios.get(`${SERVER}/api/v1/organization`, {});
    return data;
  } catch (err) {
    throw new Error('fetch organization error');
  }
};

// organization 생성
export const addOrganization = async (organizationInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/organization`, organizationInfo);
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
    const response = await axios.delete(`${SERVER}/api/v1/organization/${organizationName}`);
    if (response.status === 200) {
      alert("organization이 삭제되었습니다");
    }
  } catch (error) {
    console.log(error);
    throw new Error("delete organization error");
  }
};

// organization에 사용자 추가
export const addUserInOrganization = async (organizationName, userInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/organization/${organizationName}`, userInfo);
    if (response.status === 200) {
      alert("organization에 사용자가 추가되었습니다");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Add user in organization error");
  }
};

// 사용자별 organization 목록 조회
export const getAllOrganization = async (username) => {
  try {
    const { data } = await axios.get(`${SERVER}/api/v1/organization/${username}/all`, {});
    return data;
  } catch (err) {
    throw new Error('fetch all organization error');
  }
};


//////////////////////공유 파일/////////////////////////
// 그룹 내 공유 파일 목록 조회
export const getAllSharedFile = async (organizationName) => {
  try {
    const { data } = await axios.get(`${SERVER}/api/v1/${organizationName}/sharedFile`, {});
    return data;
  } catch (err) {
    throw new Error('fetch all shared file error');
  }
};

// 그룹 내 공유 파일 추가
export const addSharedFileInOrganization = async (organizationName, sharedFileInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/${organizationName}/sharedFile`, sharedFileInfo);
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
    const { data } = await axios.get(`${SERVER}/api/v1/${organizationName}/sharedFile/${fileName}`, {});
    return data;
  } catch (err) {
    throw new Error('fetch shared file content error');
  }
};

// 그룹내 파일 공유 중지
export const deleteSharedFile = async (organizationName, fileName) => {
  try {
    const response = await axios.delete(`${SERVER}/api/v1/${organizationName}/sharedFile/${fileName}`);
    if (response.status === 200) {
      alert("파일 공유가 중지되었습니다");
    }
  } catch (error) {
    console.log(error);
    throw new Error("delete shared file error");
  }
};


// 파일로 실행 
export const runFile = async (userInfo) => {
  try {
    var formData = new FormData();
    var imagefile = document.querySelector('#file'); // 수정 필요 -> 실제 파일로 
    formData.append("file",imagefile)
    const response = await axios.post(`${SERVER}/run/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (response.status === 200) {
      // TODO()
    }
  } catch (error) {
    throw new Error("execute error");
  }
};

// 코드 한줄 실행 
export const runLine = async (commandInfo) => {
  try {
    const response = await axios.post(`${SERVER}/run/line`, commandInfo);
    if (response.status === 200) {
      // TODO()
    }
  } catch (error) {
    throw new Error("execute error");
  }
};

// 파일 조회 
export const getFile = async () => {
  try {
      const response = await axios.get(`${SERVER}/api/v1/files`, {});
      return response;
  } catch (err) {
      throw new Error('read file error');
  }
};

// 파일 전체 조회 
export const getAllFile = async () => {
  try {
      const response = await axios.get(`${SERVER}/api/v1/files/all`, {});
      return response;
  } catch (err) {
      throw new Error('read all file error');
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

