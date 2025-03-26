import { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";

import Skeleton from "../components/Skeleton";
import SkeletonContent from "../components/SkeletonContent";
import SkeletonItem from "../components/SkeletonItem";
import SkeletonProfileRow from "../components/SkeletonProfileRow";
const meta = {
  title: "Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 600px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.BG300};
`;

export const Default: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Row>
        <Skeleton />
      </Row>
    </div>
  ),
};

export const CustomWidthAndHeight: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Row>
        <Skeleton width="80%" />
      </Row>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Row>
        <Skeleton width="4rem" height="4rem" />
      </Row>
    </div>
  ),
};

export const Circle: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Row>
        <Skeleton width="4rem" height="4rem" borderRadius="50%" />
      </Row>
    </div>
  ),
};

export const RoundedRectangle: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Row>
        <Skeleton width="100%" height="2rem" borderRadius="1rem" />
      </Row>
    </div>
  ),
};

export const WithoutAnimation: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Row>
        <Skeleton width="100%" height="1.5rem" animation={false} />
      </Row>
    </div>
  ),
};

export const ContentItem: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Row>
        <SkeletonContent />
      </Row>
    </div>
  ),
};

export const ProfileRow: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Row>
        <SkeletonProfileRow />
      </Row>
    </div>
  ),
};

export const Item: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <SkeletonItem />
    </div>
  ),
};

export const DetailPage: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  ),
};
