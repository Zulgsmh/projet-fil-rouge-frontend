import React from "react";
import moment from "moment";

interface IContainerDetails {
  createdAt: number;
  state: string;
  status: string;
  image: string;
  idImage: string;
  ipAddress: string;
}

const ContainerDetails: React.FC<IContainerDetails> = ({
  createdAt,
  idImage,
  image,
  state,
  status,
  ipAddress,
}) => {
  return (
    <div className="h-auto p-5 border border-zinc-400 rounded-lg flex flex-col">
      <span> Created At : {moment.unix(createdAt).format("MM/DD/YYYY")}</span>
      <span> Image : {image}</span>
      <span> Id image : {idImage}</span>
      <span> Status : {status}</span>
      <span> Ip : {ipAddress}</span>
    </div>
  );
};

export default ContainerDetails;
