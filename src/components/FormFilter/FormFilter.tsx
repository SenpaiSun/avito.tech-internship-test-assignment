import { Container, DEFAULT_THEME, Flex } from "@mantine/core";
import styled from "styled-components";

const ContainerFilter = styled(Container)({
  border: `1px solid ${DEFAULT_THEME.colors.dark[2]}`,
  borderRadius: '12px',
  margin: '0',
});

export const FormFilter = () => {
  return (
    <ContainerFilter w={300} h={200} >
      <Flex>

      </Flex>
    </ContainerFilter>
  );
}