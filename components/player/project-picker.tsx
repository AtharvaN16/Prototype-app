import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Symbol } from '@/components/ui/symbol';
import { Text } from '@/components/ui/text';
import { usePrototype } from '@/lib/prototype/prototype-provider';
import * as Haptics from 'expo-haptics';
import * as React from 'react';
import { Pressable } from 'react-native';

const SEPARATOR = '/';

/** Project dropdown, with projects grouped under the product they belong to. */
export function ProjectPicker() {
  const { products, product, project, selectProject } = usePrototype();

  function onValueChange(value: string) {
    const [productId, projectId] = value.split(SEPARATOR);
    if (productId === product.id && projectId === project.id) return;
    Haptics.selectionAsync();
    selectProject(productId, projectId);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Project: ${project.name}. Change project`}
          className="flex-row items-center gap-2 self-start py-1 active:opacity-60">
          <Text variant="h3">{project.name}</Text>
          <Symbol name="chevron.down" weight="semibold" className="text-muted-foreground size-4" />
        </Pressable>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuRadioGroup
          value={`${product.id}${SEPARATOR}${project.id}`}
          onValueChange={onValueChange}>
          {products.map((p, i) => (
            <React.Fragment key={p.id}>
              {i > 0 && <DropdownMenuSeparator />}
              <DropdownMenuGroup>
                <DropdownMenuLabel>{p.name}</DropdownMenuLabel>
                {p.projects.map((proj) => (
                  <DropdownMenuRadioItem key={proj.id} value={`${p.id}${SEPARATOR}${proj.id}`}>
                    <Text>{proj.name}</Text>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuGroup>
            </React.Fragment>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
