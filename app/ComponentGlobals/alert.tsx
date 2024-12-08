import React from 'react';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AlertSuccess: React.FC<{ message: string; open?: boolean }> = ({
  message,
  open,
}) => {
  return (
    <div
      className={`h-screen w-screen fixed top-0 left-0 justify-center items-center z-50 bgr-transparant ${
        open ? 'flex' : 'hidden'
      }`}
    >
      <div className="card bg-white shadow-xl lg:md:w-[40%] w-[80%] min-h-[40vh]">
        <div className="card-body flex justify-center items-center">
          <div className="animate-pulse">
            <CheckCircleIcon sx={{ fontSize: 100 }} color="success" />
          </div>
          {/* <Image src={DoneOutlineOutlinedIcon} alt='icon-success' height={100} width={200} /> */}
          <div className="m-4 text-center">{message}</div>
          {/* <CircularProgress color="success" /> */}
        </div>
      </div>
    </div>
  );
};

const AlertFailed: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-50 bgr-transparant">
      <div className="card bg-white shadow-xl lg:md:w-[40%] w-[80%] min-h-[40vh]">
        <div className="card-body flex justify-center items-center">
          <div className="animate-pulse">
            <ErrorIcon sx={{ fontSize: 100 }} color="error" />
          </div>
          {/* <Image src={DoneOutlineOutlinedIcon} alt='icon-success' height={100} width={200} /> */}
          <div className="m-4 text-center">{message}</div>
          {/* <CircularProgress color="success" /> */}
        </div>
      </div>
    </div>
  );
};

const IsLoading: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <div
      className={`h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-50 bgr-transparant ${
        !open && 'hidden'
      }`}
    >
      <CircularProgress />
    </div>
  );
};

export { AlertSuccess, AlertFailed, IsLoading };
